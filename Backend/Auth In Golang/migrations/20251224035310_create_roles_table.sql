-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS roles(
   id INT PRIMARY KEY,
   name VARCHAR(100) NOT NULL UNIQUE,
   description Text,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS roles;
-- +goose StatementEnd
