-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS users(
	   id INT PRIMARY KEY,
	   username VARCHAR(100) NOT NULL UNIQUE,
	   email VARCHAR(100) NOT NULL UNIQUE,
	   password VARCHAR(100) NOT NULL,
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	   deleted_at DATETIME DEFAULT NULL
	  );
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS USERS;
-- +goose StatementEnd
