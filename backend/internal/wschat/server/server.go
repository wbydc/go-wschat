package server

import (
	"net/http"
)

type Server struct {
}

func (s *Server) Run() error {

	http.ListenAndServe(":"+cfg.Server.Port, nil)

	return nil
}

func NewServer() (*Server, error) {
	return &Server{}, nil
}
