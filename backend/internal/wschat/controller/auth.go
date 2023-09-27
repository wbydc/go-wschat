package controller

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/wbydc/go-wschat/backend/internal/wschat/auth"
	"github.com/wbydc/go-wschat/backend/internal/wschat/config"
	"github.com/wbydc/go-wschat/backend/internal/wschat/domain"
	"github.com/wbydc/go-wschat/backend/internal/wschat/service"
	"golang.org/x/crypto/bcrypt"
)

type AuthController interface {
	Signup(w http.ResponseWriter, r *http.Request)
	Login(w http.ResponseWriter, r *http.Request)
}

type authController struct {
	userService service.UserService
	jwtSecret   []byte
}

func (c *authController) Signup(w http.ResponseWriter, r *http.Request) {
	var creds auth.Credentials

	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	user, err := c.userService.FindByName(creds.Username)

	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if user != nil {
		w.WriteHeader(http.StatusConflict)
		return
	}

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(creds.Password), bcrypt.DefaultCost)

	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	user, err = c.userService.Create(creds.Username, string(passwordHash))

	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Printf("New user created: %s", user.Id)

	w.WriteHeader(http.StatusOK)
}

func (c *authController) Login(w http.ResponseWriter, r *http.Request) {
	var creds auth.Credentials

	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	user, err := c.userService.FindByName(creds.Username)

	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password)); err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Declare the expiration time of the token
	// here, we have kept it as 5 minutes
	expirationTime := time.Now().Add(60 * time.Minute)
	// Create the JWT claims, which includes the username and expiry time
	claims := &auth.Claims{
		UserId: user.Id,
		RegisteredClaims: jwt.RegisteredClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	// Declare the token with the algorithm used for signing, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Create the JWT string
	tokenString, err := token.SignedString(c.jwtSecret)
	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	response := domain.UserInfo{
		UserId: user.Id,
		Token:  tokenString,
	}
	jsonResponse, err := json.Marshal(response)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func NewAuthController(userService service.UserService, cfg *config.Config) AuthController {
	return &authController{
		userService: userService,
		jwtSecret:   []byte(cfg.Server.JWTSecret),
	}
}
