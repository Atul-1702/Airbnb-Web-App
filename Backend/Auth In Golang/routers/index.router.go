package routers

import "github.com/go-chi/chi/v5"

type Router interface {
	Register(r chi.Router)
}

func SetupRouter(userRouter Router) *chi.Mux {

	chiRouter := chi.NewRouter()

	userRouter.Register(chiRouter)

	return chiRouter
}
