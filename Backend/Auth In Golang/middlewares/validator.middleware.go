package middlewares

import (
	"AuthInGo/dto"
	"AuthInGo/utils"
	"context"
	"net/http"
)

func UserCreateRequestValidator(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var payload dto.Signupdto

		if err := utils.ReadJsonRequest(r, &payload); err != nil {
			utils.WriteJsonErrorResponse(w, err.Error(), utils.ErrBadRequest)
			return
		}
		if err := utils.Validator.Struct(payload); err != nil {
			utils.WriteJsonErrorResponse(w, err.Error(), utils.ErrBadRequest)
			return
		}

		ctx := context.WithValue(r.Context(), "payload", payload)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
