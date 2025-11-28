package controllers

import (
	service "AuthInGo/services"
	"net/http"
)

type UserController interface {
	GetUser(w http.ResponseWriter, r *http.Request)
}

type UserControllerImpl struct {
	userservice service.UserService
}

func NewUserController(_userservice service.UserService) UserController {
	return &UserControllerImpl{
		userservice: _userservice,
	}
}

func (u *UserControllerImpl) GetUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome"))
}
