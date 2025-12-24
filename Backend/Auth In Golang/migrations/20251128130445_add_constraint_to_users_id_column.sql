-- +goose Up
-- +goose StatementBegin
ALTER TABLE users 
MODIFY COLUMN id INT AUTO_INCREMENT;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE users 
MODIFY COLUMN id INT;
-- +goose StatementEnd
