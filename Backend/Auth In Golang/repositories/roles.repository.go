package repositories

import (
	"AuthInGo/models"
	"database/sql"
)

type RoleRepository interface {
	GetRoleById(id int) (*models.Roles, error)
	GetRoleByName(name string) (*models.Roles, error)
	GetAllRoles() ([]*models.Roles, error)
	CreateRole(name string, description string) (*models.Roles, error)
	DeleteRoleById(id int) error
	UpadteRole(id int, name string, description string) (*models.Roles, error)
}

type RoleRepositoryImpl struct {
	db *sql.DB
}

func NewRoleRepository(_db *sql.DB) RoleRepository {
	return &RoleRepositoryImpl{
		db: _db,
	}
}

func (r *RoleRepositoryImpl) GetRoleById(id int) (*models.Roles, error) {
	const query string = "SELECT * FROM roles WHERE id=?"

	row := r.db.QueryRow(query, id)

	role := &models.Roles{}

	if err := row.Scan(&role.Id, &role.Name, &role.Description, &role.CreatedAt, &role.UpdatedAt); err != nil {
		return nil, err
	}
	return role, nil
}

func (r *RoleRepositoryImpl) GetRoleByName(name string) (*models.Roles, error) {
	const query string = "SELECT * FROM roles WHERE name=?"

	row := r.db.QueryRow(query, name)
	role := &models.Roles{}

	if err := row.Scan(&role.Id, &role.Name, &role.Description, &role.CreatedAt, &role.UpdatedAt); err != nil {
		return nil, err
	}
	return role, nil
}

func (r *RoleRepositoryImpl) GetAllRoles() ([]*models.Roles, error) {
	const query string = "SELECT * FROM roles"

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var roles []*models.Roles

	for rows.Next() {
		role := &models.Roles{}
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

func (r *RoleRepositoryImpl) CreateRole(name string, description string) (*models.Roles, error) {
	const query string = "INSERT INTO role(name,description,created_at,updated_at) VALUES(?,?,NOW(),NOW())"

	result, err := r.db.Exec(query, name, description)

	if err != nil {
		return nil, err
	}

	id, id_err := result.LastInsertId()

	if id_err != nil {
		return nil, err
	}

	return &models.Roles{
		Id:          int(id),
		Name:        name,
		Description: description,
		UpdatedAt:   "",
	}, nil
}

func (r *RoleRepositoryImpl) DeleteRoleById(id int) error {
	const query string = "DELETE FROM roles WHERE id=?"

	result, err := r.db.Exec(query, id)

	if err != nil {
		return err
	}

	rows_affected, err := result.RowsAffected()

	if err != nil {
		return err
	}
	if rows_affected == 0 {
		return sql.ErrNoRows
	}
	return nil
}

func (r *RoleRepositoryImpl) UpadteRole(id int, name string, description string) (*models.Roles, error) {
	const query string = "UPDATE roles SET name=?,description=?,updated_at=NOW() WHERE  id = ?"

	_, err := r.db.Exec(query, name, description, id)

	if err != nil {
		return nil, err
	}

	return &models.Roles{
		Id:          id,
		Name:        name,
		Description: description,
		CreatedAt:   "",
		UpdatedAt:   "",
	}, nil
}
