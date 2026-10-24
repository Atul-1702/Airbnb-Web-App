package repositories

import (
	"AuthInGo/models"
	"database/sql"
)

type PermissionRepository interface {
	GetPermissionById(id int) (*models.Permissions, error)
	GetPermissionByName(name string) (*models.Permissions, error)
	GetAllPermissions() ([]*models.Permissions, error)
	CreatePermission(name string, description string, resource string, action string) (*models.Permissions, error)
	DeletePermissionById(id int) error
	UpdatePermission(id int, name string, description string, resource string, action string) (*models.Permissions, error)
}

type PermissionRepositoryImpl struct {
	db *sql.DB
}

func NewPermissionRepository(_db *sql.DB) PermissionRepository {
	return &PermissionRepositoryImpl{
		db: _db,
	}
}

func (p *PermissionRepositoryImpl) GetPermissionById(id int) (*models.Permissions, error) {
	const query = "SELECT * FROM permissions WHERE id=?"

	row := p.db.QueryRow(query, id)

	var permission = &models.Permissions{}
	if err := row.Scan(&permission.Id, &permission.Name, &permission.Description, &permission.Resource, &permission.Action, &permission.CreatedAt, &permission.UpdatedAt); err != nil {
		return nil, err
	}
	return permission, nil
}

func (p *PermissionRepositoryImpl) GetPermissionByName(name string) (*models.Permissions, error) {
	const query = "SELECT * FROM permissions WHERE name=?"

	row := p.db.QueryRow(query, name)

	var permission = &models.Permissions{}
	if err := row.Scan(&permission.Id, &permission.Name, &permission.Description, &permission.Resource, &permission.Action, &permission.CreatedAt, &permission.UpdatedAt); err != nil {
		return nil, err
	}
	return permission, nil
}

func (p *PermissionRepositoryImpl) GetAllPermissions() ([]*models.Permissions, error) {
	const query = "SELECT * FROM permissions"

	row, err := p.db.Query(query)

	if err != nil {
		return nil, err
	}

	defer row.Close()

	var permissions []*models.Permissions

	for row.Next() {
		permission := &models.Permissions{}

		if err := row.Scan(&permission.Id, &permission.Name, &permission.Description, &permission.Resource, &permission.Action, &permission.CreatedAt, &permission.UpdatedAt); err != nil {
			return nil, err
		}

		permissions = append(permissions, permission)
	}
	if err := row.Err(); err != nil {
		return nil, err
	}
	return permissions, nil
}
func (p *PermissionRepositoryImpl) CreatePermission(name string, description string, resource string, action string) (*models.Permissions, error) {
	const query = "INSERT INTO permissions(name,description,resource,action,created_at,updated_at) VALUES(?,?,?,?,NOW(),NOW())"

	row, err := p.db.Exec(query, name, description, resource, action)
	if err == nil {
		return nil, err
	}
	id, idErr := row.LastInsertId()

	if idErr == nil {
		return nil, err
	}
	return &models.Permissions{
		Id:          int(id),
		Name:        name,
		Description: description,
		Resource:    resource,
		UpdatedAt:   "",
		CreatedAt:   "",
	}, nil
}

func (p *PermissionRepositoryImpl) DeletePermissionById(id int) error {
	const query = "DELETE FROM permissions WHERE id=?"

	row, err := p.db.Exec(query, id)

	if err != nil {
		return err
	}
	deletedRow, deletedRowErr := row.RowsAffected()

	if deletedRowErr != nil {
		return deletedRowErr
	}

	if deletedRow == 1 {
		return nil
	}
	return deletedRowErr
}

func (p *PermissionRepositoryImpl) UpdatePermission(id int, name string, description string, resource string, action string) (*models.Permissions, error) {
	const query = "Update permissions SET name=?,description=?,resource = ?,action=?,updated_at=Now() Where id =?"

	row, err := p.db.Exec(query, name, description, resource, action, id)

	if err != nil {
		return nil, err
	}

	updatedRow, updatedRowErr := row.RowsAffected()

	if updatedRowErr != nil {
		return nil, updatedRowErr
	}

	if updatedRow == 1 {
		return &models.Permissions{
			Id:          id,
			Name:        name,
			Description: description,
			Resource:    resource,
			Action:      action,
			UpdatedAt:   "",
			CreatedAt:   "",
		}, nil
	}
	return nil, updatedRowErr
}
