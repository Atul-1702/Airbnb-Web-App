package app

import (
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
	var server *http.Server = &http.Server{
		Addr:         app.Config.Addr,
		Handler:      nil,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	fmt.Println("Server is running")
	return server.ListenAndServe()
}
