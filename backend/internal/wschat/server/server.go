package server

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/wbydc/go-wschat/backend/internal/wschat/config"
	"github.com/wbydc/go-wschat/backend/internal/wschat/controller"
	"github.com/wbydc/go-wschat/backend/internal/wschat/middleware"
	"github.com/wbydc/go-wschat/backend/internal/wschat/utils"
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
	roomController controller.RoomController
	wsController   controller.WSController
}

func (s *server) Run(port string) error {
	return http.ListenAndServe(fmt.Sprintf(":%s", port), s.router)
}

func (s *server) RegisterRoutes() {
	s.router.Use(middleware.Logger)

	ar := s.router.PathPrefix("/auth").Subrouter()
	ar.HandleFunc("/signup", s.authController.Signup).Methods("POST")
	ar.HandleFunc("/login", s.authController.Login).Methods("POST")

	checkAuthMiddleware := middleware.CheckAuth(s.cfg.Server.JWTSecret)

	ur := s.router.PathPrefix("/user").Subrouter()
	ur.HandleFunc("/me", s.userController.Me).Methods("GET")
	ur.HandleFunc("/{id:[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[8|9|aA|bB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$}", s.userController.GetById).Methods("GET")
	ur.Use(checkAuthMiddleware)

	rr := s.router.PathPrefix("/room").Subrouter()
	rr.HandleFunc("/join/"+utils.UUIDRegEx, s.roomController.Join).Methods("GET")
	rr.HandleFunc("/"+utils.UUIDRegEx, s.roomController.GetById).Methods("GET")
	rr.Use(checkAuthMiddleware)

	// s.router.HandleFunc("/ws", s.wsController.Handler)
}

func NewServer(
	cfg *config.Config,
	authController controller.AuthController,
	userController controller.UserController,
	roomController controller.RoomController,
	wsController controller.WSController,
) Server {
	return &server{
		cfg:            cfg,
		router:         mux.NewRouter(),
		authController: authController,
		userController: userController,
		roomController: roomController,
		wsController:   wsController,
	}
}
