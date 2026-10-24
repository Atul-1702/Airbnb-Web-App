package utils

import (
	"errors"
	"net/http"
)

var (
	ErrUserNotFound   = errors.New("not found error")
	ErrInternalServer = errors.New("internal server error")
	ErrUnauthorized   = errors.New("unauthorized error")
	ErrBadRequest     = errors.New("bad request")
	ErrDuplicateEntry = errors.New("Duplicate Entry")
	ErrForbidden      = errors.New("forbidden error")
)

func HttpErrorStatusCode(err error) int {

	switch {
	case errors.Is(err, ErrUserNotFound):
		return http.StatusNotFound
	case errors.Is(err, ErrInternalServer):
		return http.StatusInternalServerError
	case errors.Is(err, ErrBadRequest):
		return http.StatusBadRequest
	case errors.Is(err, ErrBadRequest):
		return http.StatusConflict
	case errors.Is(err, ErrForbidden):
		return http.StatusForbidden
	default:
		return http.StatusInternalServerError

	}
}
