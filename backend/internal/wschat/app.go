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

	log.Printf("Starting server on port: %s\n", app.cfg.Server.Port)
	if err := app.server.Run(app.cfg.Server.Port); err != nil {
		log.Fatalf("Server launch failed: %s\n", err)
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

	log.Printf("Config loaded\n %+v", cfg)

	db, err := database.NewDatabase(cfg)

	if err != nil {
		log.Fatal(err)
		os.Exit(3)
	}

	log.Printf("Database connected\n")

	userRepository := repository.NewUserRepository(db)
	userService := service.NewUserService(userRepository)
	userController := controller.NewUserController(userService)

	roomRepository := repository.NewRoomRepository(db)
	roomService := service.NewRoomService(roomRepository)
	roomController := controller.NewRoomController(roomService)

	authController := controller.NewAuthController(userService, cfg)

	wsController := controller.NewWSController()

	log.Printf("Controllers initialized\n")

	server := server.NewServer(cfg, authController, userController, roomController, wsController)

	if err != nil {
		log.Fatal(err)
		os.Exit(4)
	}

	log.Printf("Server created\n")

	server.RegisterRoutes()

	log.Printf("Routes registered\n")

	return &App{
		cfg:    cfg,
		db:     db,
		server: server,
	}, err
}
