package repositories

import (
	"AuthInGo/models"
	"database/sql"
)

type RolePermissionRepository interface {
	GetRolePermissionById(id int) (*models.RolePermission, error)
	GetRolePermissionByRoleId(roleId int) ([]*models.RolePermission, error)
	AddPermissionToRole(roleId int, permissionId int) (*models.RolePermission, error)
	RemovePermissionFromRole(roleId int, permissionId int) error
	GetAllRolePermissions() ([]*models.RolePermission, error)
}

type RolePermissionRepositoryImpl struct {
	db *sql.DB
}

func NewRolePermissionRepository(_db *sql.DB) RolePermissionRepository {
	return &RolePermissionRepositoryImpl{
		db: _db,
	}
}

func (rp *RolePermissionRepositoryImpl) GetRolePermissionById(id int) (*models.RolePermission, error) {
	const query = "SELECT * FROM roles_permissions WHERE id=?"

	row := rp.db.QueryRow(query, id)

	var rolepermission = &models.RolePermission{}

	if err := row.Scan(&rolepermission.Id, &rolepermission.RoleId, &rolepermission.PermissionId, &rolepermission.CreatedAt, &rolepermission.UpdatedAt); err != nil {
		return nil, err
	}
	return rolepermission, nil
}
func (rp *RolePermissionRepositoryImpl) GetRolePermissionByRoleId(roleId int) ([]*models.RolePermission, error) {
	const query = "SELECT * FROM roles_permissions WHERE role_id=?"

	rows, err := rp.db.Query(query, roleId)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var rolepermissions []*models.RolePermission

	for rows.Next() {
		var rolePermission = &models.RolePermission{}

		if err := rows.Scan(&rolePermission.Id, &rolePermission.RoleId, &rolePermission.PermissionId, &rolePermission.CreatedAt, &rolePermission.UpdatedAt); err != nil {
			return nil, err
		}
		rolepermissions = append(rolepermissions, rolePermission)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return rolepermissions, nil
}

func (rp *RolePermissionRepositoryImpl) AddPermissionToRole(roleId int, permissionId int) (*models.RolePermission, error) {
	const query = "INSERT INTO roles_permissions(role_id,permission_id,created_at,updated_at) VALUES(?,?,NOW(),NOW())"

	result, err := rp.db.Exec(query, roleId, permissionId)

	if err != nil {
		return nil, err
	}

	id, id_err := result.LastInsertId()

	if id_err != nil {
		return nil, id_err
	}

	return &models.RolePermission{
		Id:           int(id),
		RoleId:       roleId,
		PermissionId: permissionId,
		CreatedAt:    "",
		UpdatedAt:    "",
	}, nil
}

func (rp *RolePermissionRepositoryImpl) RemovePermissionFromRole(roleId int, permissionId int) error {
	const query = "DELETE FROM roles_permissions WHERE role_id = ? AND permission_id = ?"

	result, err := rp.db.Exec(query, roleId, permissionId)

	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()

	if err != nil {
		return err
	}
	if rowsAffected == 0 {
		return sql.ErrNoRows
	}
	return nil
}

func (rp *RolePermissionRepositoryImpl) GetAllRolePermissions() ([]*models.RolePermission, error) {
	const query = "SELECT * FROM roles_permissions"

	result, err := rp.db.Query(query)

	if err != nil {
		return nil, err
	}

	defer result.Close()

	var rolepermissions []*models.RolePermission

	for result.Next() {
		var rolepermission = &models.RolePermission{}

		if err := result.Scan(&rolepermission.Id, &rolepermission.RoleId, &rolepermission.PermissionId, &rolepermission.CreatedAt, &rolepermission.UpdatedAt); err != nil {
			return nil, err
		}
		rolepermissions = append(rolepermissions, rolepermission)
	}
	if err := result.Err(); err != nil {
		return nil, err
	}

	return rolepermissions, nil
}
