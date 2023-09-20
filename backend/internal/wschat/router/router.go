package router

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type Router interface {
	HandleFunc(pattern string, handler func(w http.ResponseWriter, r *http.Request))
	Serve(port string) error
}

type router struct {
	muxRouter *mux.Router
}

func (r *router) HandleFunc(pattern string, handler func(w http.ResponseWriter, r *http.Request)) {
	r.muxRouter.HandleFunc(pattern, handler)
}

func (r *router) Serve(port string) error {
	return http.ListenAndServe(fmt.Sprintf(":%s", port), nil)
}

func NewRouter() Router {
	muxRouter := mux.NewRouter()
	return &router{
		muxRouter: muxRouter,
	}
}
