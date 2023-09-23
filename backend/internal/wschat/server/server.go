package server

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/wbydc/go-wschat/backend/internal/wschat/config"
	"github.com/wbydc/go-wschat/backend/internal/wschat/controller"
	"github.com/wbydc/go-wschat/backend/internal/wschat/middleware"
)

type Server interface {
	Run(port string) error
	RegisterRoutes()
}

type server struct {
	cfg            *config.Config
	router         *mux.Router
	authController controller.AuthController
	userController controller.UserController
	wsController   controller.WSController
}

func (s *server) Run(port string) error {
	return http.ListenAndServe(fmt.Sprintf(":%s", port), s.router)
}

func (s *server) RegisterRoutes() {
	s.router.Use(middleware.Logger)

	ar := s.router.PathPrefix("/auth").Subrouter()
	ar.HandleFunc("/signup", s.authController.Signup)
	ar.HandleFunc("/login", s.authController.Login)
	ar.HandleFunc("/logout", s.authController.Logout)

	ur := s.router.PathPrefix("/user").Subrouter()
	ur.HandleFunc("/me", s.userController.Me)
	ur.HandleFunc("/{id:[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[8|9|aA|bB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$}", s.userController.GetById)
	ur.Use(middleware.CheckAuth(s.cfg.Server.JWTSecret))

	// s.router.HandleFunc("/ws", s.wsController.Handler)
}

func NewServer(
	cfg *config.Config,
	authController controller.AuthController,
	userController controller.UserController,
	wsController controller.WSController,
) Server {
	return &server{
		cfg:            cfg,
		router:         mux.NewRouter(),
		authController: authController,
		userController: userController,
		wsController:   wsController,
	}
}
