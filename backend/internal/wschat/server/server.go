package server

import (
	"github.com/wbydc/go-wschat/backend/internal/wschat/controller"
	"github.com/wbydc/go-wschat/backend/internal/wschat/router"
)

type Server interface {
	Run(port string) error
	RegisterRoutes()
}

type server struct {
	router         router.Router
	authController controller.AuthController
	userController controller.UserController
	wsController   controller.WSController
}

func (s *server) Run(port string) error {
	return s.router.Serve(port)
}

func (s *server) RegisterRoutes() {
	s.router.HandleFunc("/auth/signup", s.authController.Signup)
	s.router.HandleFunc("/auth/login", s.authController.Login)
	s.router.HandleFunc("/auth/logout", s.authController.Logout)

	s.router.HandleFunc("/user/{id}", s.userController.GetById)

	// s.router.HandleFunc("/ws", s.wsController.Handler)
}

func NewServer(
	router router.Router,
	authController controller.AuthController,
	userController controller.UserController,
	wsController controller.WSController,
) Server {
	return &server{
		router:         router,
		authController: authController,
		userController: userController,
		wsController:   wsController,
	}
}
