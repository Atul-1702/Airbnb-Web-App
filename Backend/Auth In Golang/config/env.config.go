package config

import (
	"fmt"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

func Load() {
	var err error = godotenv.Load()

	if err != nil {
		fmt.Println("Env variables load failed...")
		return
	}
	fmt.Println("Env variables loaded successfully")
}

func GetStringEnv(key string, fallback string) string {
	val, ok := os.LookupEnv(key)

	if !ok {
		return fallback
	}

	return val
}

func GetIntEnv(key string, fallback int) int {
	val, ok := os.LookupEnv(key)

	if !ok {
		return fallback
	}
	var intValue, err = strconv.Atoi(val)
	if err != nil {
		fmt.Println("Env conversion string to int failed")
		return fallback
	}
	return intValue
}

func GetBoolEnv(key string, fallback bool) bool {
	val, ok := os.LookupEnv(key)

	if !ok {
		return fallback
	}
	var boolValue, err = strconv.ParseBool(val)

	if err != nil {
		fmt.Println("String to bool env conversion failed")
		return fallback
	}

	return boolValue
}
