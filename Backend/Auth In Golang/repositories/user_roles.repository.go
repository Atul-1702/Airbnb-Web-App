package repositories

import (
	"AuthInGo/models"
	"database/sql"
	"fmt"
	"strings"
)

type UserRoleRepository interface {
	GetUserRoles(userId int) ([]*models.Roles, error)
	AssignRoleToUser(userId int, roleId int) error
	RemoveRoleFromUser(userId int, roleId int) error
	GetUserPermissions(userId int) ([]*models.Permissions, error)
	HasPermission(userId int, permissionName string) (bool, error)
	HasRole(userId int, roleNames string) (bool, error)
	HasAllRoles(userId int, roleNames []string) (bool, error)
	HasAnyRole(userId int, roleNames []string) (bool, error)
}

type UserRoleRepositoryImpl struct {
	db *sql.DB
}

func NewUserRoleRepository(_db *sql.DB) UserRoleRepository {
	return &UserRoleRepositoryImpl{
		db: _db,
	}
}

func (ur *UserRoleRepositoryImpl) GetUserRoles(userId int) ([]*models.Roles, error) {
	const query = "SELECT r.id,r.name,r.description,r.created_at,r.updated_at FROM user_roles ur INNER JOIN roles r ON ur.role.id = r.id WHERE ur.user_id = ?"

	rows, err := ur.db.Query(query, userId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var roles []*models.Roles

	for rows.Next() {
		var role = &models.Roles{}

		if err := rows.Scan(&role.Id, &role.Name, &role.Description, &role.CreatedAt, &role.UpdatedAt); err != nil {
			return nil, err
		}

		roles = append(roles, role)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}
	return roles, nil
}

func (ur *UserRoleRepositoryImpl) AssignRoleToUser(userId int, roleId int) error {
	const query = "INSERT INTO user_roles(user_id,role_id) VALUES(?,?);"

	_, err := ur.db.Exec(query, userId, roleId)

	if err != nil {
		return err
	}

	return nil
}
func (ur *UserRoleRepositoryImpl) RemoveRoleFromUser(userId int, roleId int) error {
	const query = "DELETE FROM user_roles WHERE user_id=? AND role_id = ?"

	_, err := ur.db.Exec(query, userId, roleId)

	if err != nil {
		return err
	}
	return nil
}

func (ur *UserRoleRepositoryImpl) GetUserPermissions(userId int) ([]*models.Permissions, error) {
	const query = `SELECT * FROM user_roles ur INNER JOIN roles_permissions rp ON ur.role_id = rp.role_id
	               INEER JOIN permissions p ON rp.permission_id = p.id
				   WHERE ur.user_id=?`

	rows, err := ur.db.Query(query, userId)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var permissions []*models.Permissions

	for rows.Next() {
		var permission = &models.Permissions{}

		if rows.Scan(&permission.Id, &permission.Name, &permission.Description, &permission.Resource, &permission.Action, &permission.CreatedAt, &permission.UpdatedAt); err != nil {
			return nil, err
		}
		permissions = append(permissions, permission)
	}

	if scan_err := rows.Err(); scan_err != nil {
		return nil, err
	}
	return permissions, nil
}

func (ur *UserRoleRepositoryImpl) HasPermission(userId int, permissionName string) (bool, error) {
	const query = `
	                SELECT COUNT(*) > 0  FROM user_roles ur INNER JOIN roles_permissions rp ON ur.role_id = rp.role_id 
					INNER JOIN permissions p ON rp.permission_id = p.id
					WHERE ur.user_id = ? AND p.name = ?;
	               `
	var exists bool
	err := ur.db.QueryRow(query, userId, permissionName).Scan(&exists)

	if err != nil {
		return false, err
	}

	return exists, nil

}

func (ur *UserRoleRepositoryImpl) HasRole(userId int, roleName string) (bool, error) {
	const query = `
	           SELECT COUNT(*) > 0 FROM user_roles ur INNER JOIN roles r
			   ON ur.user_id = ? AND r.name=?
	        `
	var exists bool

	err := ur.db.QueryRow(query, userId, roleName).Scan(&exists)

	if err != nil {
		return false, err
	}
	return exists, nil
}

func (ur *UserRoleRepositoryImpl) HasAllRoles(userId int, roleNames []string) (bool, error) {

	if len(roleNames) == 0 {
		return true, nil
	}

	const query = `
	                 SELECT COUNT(*) = ? from user_roles ur INNER JOIN roles r ON ur.role_id = r.id 
					 WHERE ur.user_id = ? AND r.name In(?)
					 GROUP BY ur.user.id      
	                `
	roleNameStr := strings.Join(roleNames, ",")

	rows := ur.db.QueryRow(query, len(roleNames), userId, roleNameStr)

	var hasAllRoles bool

	if err := rows.Scan(&hasAllRoles); err != nil {
		if err == sql.ErrNoRows {
			return false, nil
		}
		return false, err
	}
	return hasAllRoles, nil
}

func (ur *UserRoleRepositoryImpl) HasAnyRole(userId int, roleNames []string) (bool, error) {
	if len(roleNames) == 0 {
		return true, nil
	}

	placeholders := strings.Repeat("?,", len(roleNames))
	placeholders = placeholders[:len(placeholders)-1]

	query := fmt.Sprintf("SELECT COUNT(*) > 0 FROM user_roles ur INNER JOIN roles r ON ur.role_id = r.id WHERE ur.user_id = ? AND r.name IN (%s)", placeholders)

	args := make([]interface{}, 0, 1+len(roleNames))
	args = append(args, userId)

	for _, roleName := range roleNames {
		args = append(args, roleName)
	}

	row := ur.db.QueryRow(query, args...)
	var hasAnyRole bool
	if err := row.Scan(&hasAnyRole); err != nil {
		if err == sql.ErrNoRows {
			return false, nil
		}
		return false, err

	}
	return hasAnyRole, nil
}
