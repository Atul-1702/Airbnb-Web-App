package utils

import (
	"encoding/json"
	"net/http"

	"github.com/go-playground/validator/v10"
)

var Validator *validator.Validate

func init() {
	Validator = NewValidator()
}

func NewValidator() *validator.Validate {
	return validator.New(validator.WithRequiredStructEnabled())
}

func WriteJsonResponse(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func WriteJsonSuccessResponse(w http.ResponseWriter, status int, message string, data any) {
	response := map[string]any{}

	response["success"] = true
	response["message"] = message
	response["data"] = data

	WriteJsonResponse(w, status, response)
}

func WriteJsonErrorResponse(w http.ResponseWriter, msg string, err error) {
	response := map[string]any{}

	response["success"] = false
	response["message"] = msg
	response["error"] = err.Error()

	WriteJsonResponse(w, HttpErrorStatusCode(err), response)
}

func ReadJsonRequest(r *http.Request, data any) error {
	var decoder *json.Decoder = json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	return decoder.Decode(data)
}
