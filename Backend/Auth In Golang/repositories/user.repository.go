package repositories

import (
	"AuthInGo/dto"
	"AuthInGo/utils"
	"database/sql"
	"errors"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

type UserRepository interface {
	CreateUser(payload dto.Signupdto) (sql.Result, error)
	GetAllUsers() error
	LoginUser(logindto dto.Logindto) (string, string, error)
}

type UserRepositoryImpl struct {
	db *sql.DB
}

func NewUserRepository(_db *sql.DB) UserRepository {
	return &UserRepositoryImpl{
		db: _db,
	}
}

func (repo *UserRepositoryImpl) CreateUser(payload dto.Signupdto) (sql.Result, error) {
	const query = "INSERT INTO users(username,email,password) VALUES (?,?,?);"
	data, err := repo.db.Exec(query, payload.Username, payload.Email, payload.Password)

	if err != nil {
		var mysqlErr *mysql.MySQLError

		if errors.As(err, &mysqlErr) {
			if mysqlErr.Number == 1062 {
				return nil, utils.ErrDuplicateEntry
			}
		}
		return nil, utils.ErrInternalServer
	}
	return data, nil
}

func (repo *UserRepositoryImpl) LoginUser(logindto dto.Logindto) (string, string, error) {
	const emailQuery = "SELECT password FROM users WHERE email=?"

	row := repo.db.QueryRow(emailQuery, logindto.Email)

	var password string
	err := row.Scan(&password)

	if err == sql.ErrNoRows {
		return "", "User not found.", utils.ErrUserNotFound
	}
	if err != nil {
		return "", "Internal server error occured.", utils.ErrInternalServer
	}

	return password, "", nil
}

func (repo *UserRepositoryImpl) GetAllUsers() error {
	const query = "SELECT * FROM users"

	rows, err := repo.db.Query(query)

	if err != nil {
		fmt.Println("Error while fetching", err)
		return err
	}
	fmt.Println("Code changed", rows.Scan())
	return err
}
