package middlewares

import (
	"AuthInGo/config"
	"AuthInGo/repositories"
	"AuthInGo/utils"
	"context"
	"net/http"
	"strconv"
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
		userId := claims["id"]
		original_context := r.Context()
		new_context := context.WithValue(original_context, "email", email)
		new_context = context.WithValue(new_context, "userId", userId)
		next.ServeHTTP(w, r.WithContext(new_context))
	})
}

func RequireAllRoles(roles ...string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc((func(w http.ResponseWriter, r *http.Request) {
			userIdStr := r.Context().Value("userId").(string)

			userId, err := strconv.ParseInt(userIdStr, 10, 64)

			if err != nil {
				utils.WriteJsonErrorResponse(w, "Invalid user Id", utils.ErrUnauthorized)
				return
			}

			dbConn, dbErr := config.SetupDBConfig()

			if dbErr != nil {
				utils.WriteJsonErrorResponse(w, "Database connection error"+dbErr.Error(), utils.ErrInternalServer)
				return
			}
			urr := repositories.NewUserRoleRepository(dbConn)
			hasAllRoles, hasAllRolesErr := urr.HasAllRoles(int(userId), roles)

			if hasAllRolesErr != nil {
				utils.WriteJsonErrorResponse(w, "Error checking user roles: "+hasAllRolesErr.Error(), utils.ErrInternalServer)
				return
			}

			if !hasAllRoles {
				utils.WriteJsonErrorResponse(w, "Forbidden: You do not have the required roles", utils.ErrForbidden)
				return
			}

			next.ServeHTTP(w, r)
		}))
	}
}

func RequireAnyRole(roles ...string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			userIdStr := r.Context().Value("userId").(string)

			userId, err := strconv.ParseInt(userIdStr, 10, 64)

			if err != nil {
				utils.WriteJsonErrorResponse(w, "Invalid user Id", utils.ErrUnauthorized)
				return
			}

			dbConn, dbErr := config.SetupDBConfig()

			if dbErr != nil {
				utils.WriteJsonErrorResponse(w, "Database connection error"+dbErr.Error(), utils.ErrInternalServer)
				return
			}

			urr := repositories.NewUserRoleRepository(dbConn)
			hasAnyRole, hasAnyRoleErr := urr.HasAnyRole(int(userId), roles)

			if hasAnyRoleErr != nil {
				utils.WriteJsonErrorResponse(w, "Error checking user roles: "+hasAnyRoleErr.Error(), utils.ErrInternalServer)
				return
			}

			if !hasAnyRole {
				utils.WriteJsonErrorResponse(w, "Forbidden: You do not have the required roles", utils.ErrForbidden)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
