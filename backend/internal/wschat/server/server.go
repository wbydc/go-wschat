package server

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type Server struct {
}

func (s *Server) Run() error {
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		conn, _ := upgrader.Upgrade(w, r, nil)

		for {
			// Read message from browser
			msgType, msg, err := conn.ReadMessage()
			if err != nil {
				return
			}

			// Print the message to the console
			fmt.Printf("%s sent: %s\n", conn.RemoteAddr(), string(msg))

			// Write message back to browser
			if err = conn.WriteMessage(msgType, msg); err != nil {
				return
			}
		}
	})

	http.ListenAndServe(":"+cfg.Server.Port, nil)

	return nil
}

func NewServer() (*Server, error) {
	return &Server{}, nil
}
