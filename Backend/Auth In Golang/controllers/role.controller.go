package controllers

import service "AuthInGo/services"

type RoleController interface {
}

type RoleControllerImpl struct {
	RoleService service.RoleService
}

func NewRoleController(rService service.RoleService) RoleController{
	 return &RoleControllerImpl{
		  RoleService: ,
	 }
}