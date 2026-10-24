package service

import (
	"AuthInGo/models"
	"AuthInGo/repositories"
)

type RoleService interface {
	GetRoleByIdService(id int) (*models.Roles, error)
	GetRoleByNameService(name string) (*models.Roles, error)
	GetAllRolesService() ([]*models.Roles, error)
	CreateRoleService(name string, description string) (*models.Roles, error)
	DeleteRoleByIdService(id int) error
	UpdateRoleService(id int, name string, description string) (*models.Roles, error)
	GetRolePermissionsService(roleId int) ([]*models.RolePermission, error)
	AddPermissionToRoleService(roleId int, permissionId int) (*models.RolePermission, error)
	RemovePermissionFromRoleService(roleId int, permissionId int) error
	GetAllRolePermissionsService() ([]*models.RolePermission, error)
	AssignRoleToUserService(userId int, roleId int) error
}

type RoleServiceImpl struct {
	roleRepository           repositories.RoleRepository
	rolePermissionRepository repositories.RolePermissionRepository
	userRoleRepository       repositories.UserRoleRepository
}

func NewRolService(roleRepo repositories.RoleRepository, rolePermissionRepo repositories.RolePermissionRepository, userRepo repositories.UserRoleRepository) RoleService {
	return &RoleServiceImpl{
		roleRepository:           roleRepo,
		rolePermissionRepository: rolePermissionRepo,
		userRoleRepository:       userRepo,
	}
}

func (r *RoleServiceImpl) GetRoleByIdService(id int) (*models.Roles, error) {
	return r.roleRepository.GetRoleById(id)
}

func (r *RoleServiceImpl) GetRoleByNameService(name string) (*models.Roles, error) {
	return r.roleRepository.GetRoleByName(name)
}

func (r *RoleServiceImpl) GetAllRolesService() ([]*models.Roles, error) {
	return r.roleRepository.GetAllRoles()
}

func (r *RoleServiceImpl) CreateRoleService(name string, description string) (*models.Roles, error) {
	return r.roleRepository.CreateRole(name, description)
}

func (r *RoleServiceImpl) DeleteRoleByIdService(id int) error {
	return r.roleRepository.DeleteRoleById(id)
}
func (r *RoleServiceImpl) UpdateRoleService(id int, name string, description string) (*models.Roles, error) {
	return r.roleRepository.UpadteRole(id, name, description)
}

func (r *RoleServiceImpl) GetRolePermissionsService(roleId int) ([]*models.RolePermission, error) {
	return r.rolePermissionRepository.GetRolePermissionByRoleId(roleId)
}

func (r *RoleServiceImpl) AddPermissionToRoleService(roleId int, permissionId int) (*models.RolePermission, error) {
	return r.rolePermissionRepository.AddPermissionToRole(roleId, permissionId)
}

func (r *RoleServiceImpl) RemovePermissionFromRoleService(roleId int, permissionId int) error {
	return r.rolePermissionRepository.RemovePermissionFromRole(roleId, permissionId)
}

func (r *RoleServiceImpl) GetAllRolePermissionsService() ([]*models.RolePermission, error) {
	return r.rolePermissionRepository.GetAllRolePermissions()
}

func (r *RoleServiceImpl) AssignRoleToUserService(userId int, roleId int) error {
	return r.userRoleRepository.AssignRoleToUser(userId, roleId)
}
