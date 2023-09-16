package auth

import (
	"github.com/golang-jwt/jwt/v4"
	"github.com/wbydc/go-wschat/backend/internal/wschat/domain"
)

type Credentials struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

type Claims struct {
	UserId domain.UserId `json:"userId"`
	jwt.RegisteredClaims
}
