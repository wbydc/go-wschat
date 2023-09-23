package controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/wbydc/go-wschat/backend/internal/wschat/domain"
	"github.com/wbydc/go-wschat/backend/internal/wschat/service"
)

type UserController interface {
	Me(w http.ResponseWriter, r *http.Request)
	GetById(w http.ResponseWriter, r *http.Request)
}

type userController struct {
	userService service.UserService
}

func (c *userController) Me(w http.ResponseWriter, r *http.Request) {
}

func (c *userController) GetById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id, ok := vars["id"]

	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	idUUID, err := uuid.Parse(id)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	user, err := c.userService.FindById(domain.UserId(idUUID))

	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	user.Password = ""
	jsonResponse, err := json.Marshal(user)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func NewUserController(userService service.UserService) UserController {
	return &userController{
		userService: userService,
	}
}
