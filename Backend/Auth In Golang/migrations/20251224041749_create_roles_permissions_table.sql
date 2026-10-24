-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS roles_permissions(
   id INT PRIMARY KEY,
   role_id Int NOT NULL,
   permission_id INT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
   FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS roles_permissions;
-- +goose StatementEnd
