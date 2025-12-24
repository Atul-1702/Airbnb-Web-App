package middlewares

import (
	"AuthInGo/config"
	"AuthInGo/utils"
	"context"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

func JWTAuthMiddleare(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")

		if authHeader == "" {
			utils.WriteJsonErrorResponse(w, "Authorization token is required.", utils.ErrUnauthorized)
			return
		}

		if !strings.HasPrefix(authHeader, "Bearer ") {
			utils.WriteJsonErrorResponse(w, "Authorization token must starts with bearer.", utils.ErrUnauthorized)
			return
		}

		token := strings.TrimPrefix(authHeader, "Bearer ")

		claims := jwt.MapClaims{}
		_, err := jwt.ParseWithClaims(token, &claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(config.GetStringEnv("JWT_SECRET", "")), nil
		})

		if err != nil {
			utils.WriteJsonErrorResponse(w, "Authorization token is invalid.", utils.ErrUnauthorized)
			return
		}

		email := claims["email"]

		original_context := r.Context()
		new_context := context.WithValue(original_context, "email", email)

		next.ServeHTTP(w, r.WithContext(new_context))
	})
}
