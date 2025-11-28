package routers

import (
	"AuthInGo/controllers"

	"github.com/go-chi/chi/v5"
)

type UserRouter struct {
	usercontroller controllers.UserController
}

func NewUserRouter(_usercontroller controllers.UserController) Router {
	return &UserRouter{
		usercontroller: _usercontroller,
	}
}

func (urouter *UserRouter) Register(router chi.Router) {
	router.Get("/", urouter.usercontroller.GetUser)
}
