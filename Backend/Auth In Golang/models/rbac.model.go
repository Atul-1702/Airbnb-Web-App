package models

type Roles struct {
	Id          int
	Name        string
	Description string
	CreatedAt   string
	UpdatedAt   string
}

type Permissions struct {
	Id          int
	Name        string
	Description string
	Resource    string
	Action      string
	CreatedAt   string
	UpdatedAt   string
}

type RolePermission struct {
	Id           int
	RoleId       int
	PermissionId int
	CreatedAt    string
	UpdatedAt    string
}
