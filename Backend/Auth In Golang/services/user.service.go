package service

import (
	repo "AuthInGo/repositories"
)

type UserService interface {
}

type UserServiceImpl struct {
	repository repo.UserRepository
}

func NewUserService(_repository repo.UserRepository) UserService {
	return &UserServiceImpl{
		repository: _repository,
	}
}
