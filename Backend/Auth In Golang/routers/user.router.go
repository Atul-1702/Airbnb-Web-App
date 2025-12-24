package routers

import (
	"AuthInGo/controllers"
	"AuthInGo/middlewares"

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

	router.With(middlewares.UserCreateRequestValidator).Post("/signup", urouter.usercontroller.CreateUserHandler)
	router.Post("/signin", urouter.usercontroller.LoginUserHandler)
	router.Get("/", urouter.usercontroller.GetUsersHandler)
}
