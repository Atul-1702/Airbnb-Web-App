package utils

import "golang.org/x/crypto/bcrypt"

func HashPassword(plainPassword string) (string, error) {
	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(plainPassword), bcrypt.DefaultCost)

	if err != nil {
		return "", err
	}
	return string(hashedBytes), nil
}

func CheckPasswordHash(plainPassword string, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
	return err == nil
}
