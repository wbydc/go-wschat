package wschat

import (
	"database/sql"
	"log"
	"os"

	"github.com/wbydc/go-wschat/backend/internal/wschat/config"
	"github.com/wbydc/go-wschat/backend/internal/wschat/controller"
	"github.com/wbydc/go-wschat/backend/internal/wschat/database"
	"github.com/wbydc/go-wschat/backend/internal/wschat/repository"
	"github.com/wbydc/go-wschat/backend/internal/wschat/server"
	"github.com/wbydc/go-wschat/backend/internal/wschat/service"
)

type App struct {
	cfg    *config.Config
	server server.Server
	db     *sql.DB
}

func (app *App) Run() error {
	defer app.close()
	if err := app.server.Run(app.cfg.Server.Port); err != nil {
		log.Printf("Server launch failed: %s\n", err)
		return err
	}

	return nil
}

func (app *App) close() {
	if err := app.db.Close(); err != nil {
		log.Fatalf("Database connection closing failed: %s", err)
	}
	log.Printf("Goodbye")
}

func NewApp() (*App, error) {
	cfg, err := config.LoadConfig()

	if err != nil {
		log.Fatal(err)
		os.Exit(2)
	}

	db, err := database.NewDatabase(cfg)

	if err != nil {
		log.Fatal(err)
		os.Exit(3)
	}

	userRepository := repository.NewUserRepository(db)
	userService := service.NewUserService(userRepository)

	authController := controller.NewAuthController(userService, cfg)
	userController := controller.NewUserController(userService)
	wsController := controller.NewWSController()

	server := server.NewServer(cfg, authController, userController, wsController)

	if err != nil {
		log.Fatal(err)
		os.Exit(4)
	}

	server.RegisterRoutes()

	return &App{
		cfg:    cfg,
		db:     db,
		server: server,
	}, err
}
