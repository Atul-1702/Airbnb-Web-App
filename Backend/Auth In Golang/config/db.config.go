package config

import (
	"database/sql"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

func SetupDBConfig() (*sql.DB, error) {
	cfg := mysql.NewConfig()

	cfg.Addr = GetStringEnv("DB_ADDRESS", "127.0.0.1:3306")
	cfg.User = GetStringEnv("DB_USERNAME", "root")
	cfg.Passwd = GetStringEnv("DB_PASSWORD", "atul")
	cfg.Net = GetStringEnv("DB_NET", "tcp")
	cfg.DBName = GetStringEnv("DB_NAME", "")

	db, err := sql.Open("mysql", cfg.FormatDSN())

	if err != nil {
		fmt.Println("DB Connection failed.")
		return nil, err
	}

	pingErr := db.Ping()
	if pingErr != nil {
		fmt.Println("Error pinging Database...")
		return nil, pingErr
	}
	fmt.Println("Connected to database successfully:", cfg.DBName)
	return db, nil
}
