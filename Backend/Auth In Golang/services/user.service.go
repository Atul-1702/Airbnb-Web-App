package service

import (
	"AuthInGo/config"
	"AuthInGo/dto"
	repo "AuthInGo/repositories"
	"AuthInGo/utils"

	"github.com/golang-jwt/jwt/v5"
)

type UserService interface {
	CreateUserService(payload dto.Signupdto) (string, error)
	GetAllUsersService() error
	LoginUserService(logindto dto.Logindto) (string, string, error)
}

type UserServiceImpl struct {
	repository repo.UserRepository
}

func NewUserService(_repository repo.UserRepository) UserService {
	return &UserServiceImpl{
		repository: _repository,
	}
}

func (us *UserServiceImpl) CreateUserService(payload dto.Signupdto) (string, error) {

	hashed_password, err := utils.HashPassword(payload.Password)

	if err != nil {
		return err.Error(), utils.ErrInternalServer
	}
	payload.Password = hashed_password
	row, row_err := us.repository.CreateUser(payload)

	if row_err != nil {
		return row_err.Error(), row_err
	}
	affect_row, affect_row_err := row.RowsAffected()

	if affect_row_err != nil {
		return affect_row_err.Error(), utils.ErrInternalServer
	}
	if affect_row == 1 {
		return "", nil
	}
	return affect_row_err.Error(), utils.ErrInternalServer
}

func (us *UserServiceImpl) LoginUserService(logindto dto.Logindto) (string, string, error) {
	password, err_msg, err := us.repository.LoginUser(logindto)

	if err != nil {
		return "", err_msg, err
	}
	if utils.CheckPasswordHash(logindto.Password, password) == false {
		return "", "Incorrect password", utils.ErrUnauthorized
	}
	claims := jwt.MapClaims{
		"email": logindto.Email,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &claims)

	tokenString, tokenErr := token.SignedString([]byte(config.GetStringEnv("JWT_SECRET", "")))
	if tokenErr != nil {
		return "", err_msg, tokenErr
	}
	return tokenString, err_msg, nil
}

func (u_service *UserServiceImpl) GetAllUsersService() error {
	return u_service.repository.GetAllUsers()
}
