package controllers

import (
	"AuthInGo/dto"
	service "AuthInGo/services"
	"AuthInGo/utils"
	"net/http"
)

type UserController interface {
	CreateUserHandler(w http.ResponseWriter, r *http.Request)
	GetUsersHandler(w http.ResponseWriter, r *http.Request)
	LoginUserHandler(w http.ResponseWriter, r *http.Request)
}

type UserControllerImpl struct {
	userservice service.UserService
}

func NewUserController(_userservice service.UserService) UserController {
	return &UserControllerImpl{
		userservice: _userservice,
	}
}

func (u *UserControllerImpl) CreateUserHandler(w http.ResponseWriter, r *http.Request) {
	payload := r.Context().Value("payload").(dto.Signupdto)

	err_msg, err := u.userservice.CreateUserService(payload)

	if err != nil {
		utils.WriteJsonErrorResponse(w, err_msg, err)
		return
	}
	utils.WriteJsonSuccessResponse(w, http.StatusCreated, "User account created successfully", "")

}

func (u *UserControllerImpl) LoginUserHandler(w http.ResponseWriter, r *http.Request) {
	var dtoData dto.Logindto

	utils.ReadJsonRequest(r, &dtoData)
	err := utils.Validator.Struct(dtoData)
	if err != nil {
		utils.WriteJsonErrorResponse(w, "Validation Fialed", err)
		return
	}
	data, err_msg, err := u.userservice.LoginUserService(dtoData)
	if err != nil {
		utils.WriteJsonErrorResponse(w, err_msg, err)
		return
	}
	utils.WriteJsonSuccessResponse(w, http.StatusOK, "User logged in successfullly.", data)
}

func (user_contr *UserControllerImpl) GetUsersHandler(w http.ResponseWriter, r *http.Request) {
	user_contr.userservice.GetAllUsersService()

}
