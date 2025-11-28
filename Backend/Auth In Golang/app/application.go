package app

import (
	"AuthInGo/config"
	"AuthInGo/controllers"
	"AuthInGo/repositories"
	"AuthInGo/routers"
	service "AuthInGo/services"
	"fmt"
	"net/http"
	"time"
)

type Config struct {
	Addr string
}

type Application struct {
	Config Config
}

func NewConfig(addr string) *Config {
	var config *Config = &Config{
		Addr: addr,
	}
	return config
}

func NewApplication(config Config) *Application {
	var app *Application = &Application{
		Config: config,
	}
	return app
}

func (app *Application) Run() error {
	db, err := config.SetupDBConfig()
	if err != nil {
		fmt.Println("Error occured while configuring db connections.")
		return err
	}

	user_repo := repositories.NewUserRepository(db)
	user_service := service.NewUserService(user_repo)
	user_controller := controllers.NewUserController(user_service)
	user_router := routers.NewUserRouter(user_controller)

	var server *http.Server = &http.Server{
		Addr:         app.Config.Addr,
		Handler:      routers.SetupRouter(user_router),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	fmt.Println("Server is running")
	return server.ListenAndServe()
}
