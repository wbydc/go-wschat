package middleware

import (
	"context"
	"net/http"

	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
	"github.com/wbydc/go-wschat/backend/internal/wschat/auth"
	"github.com/wbydc/go-wschat/backend/internal/wschat/utils"
)

func CheckAuth(jwtSecret string) mux.MiddlewareFunc {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			tokenString := r.Header.Get("X-Auth-Token")
			if tokenString == "" {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			claims := &auth.Claims{}

			// Parse the JWT string and store the result in `claims`.
			// Note that we are passing the key in this method as well. This method will return an error
			// if the token is invalid (if it has expired according to the expiry time we set on sign in),
			// or if the signature does not match
			token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (any, error) {
				return []byte(jwtSecret), nil
			})

			if err != nil {
				if err == jwt.ErrSignatureInvalid {
					w.WriteHeader(http.StatusUnauthorized)
					return
				}
				w.WriteHeader(http.StatusBadRequest)
				return
			}
			if !token.Valid {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			ctxWithUserId := context.WithValue(r.Context(), utils.ContextUserIdKey, claims.UserId)
			rWithUserId := r.WithContext(ctxWithUserId)

			next.ServeHTTP(w, rWithUserId)
		})
	}
}
