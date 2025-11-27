package main

import (
	"AuthInGo/app"
	"AuthInGo/config"
)

func main() {
	var app_config *app.Config = app.NewConfig(":3001")

	var app *app.Application = app.NewApplication(*app_config)
	config.Load()
	app.Run()
}
