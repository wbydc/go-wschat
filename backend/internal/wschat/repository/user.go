package repository

import (
	"database/sql"
	"log"

	"github.com/wbydc/go-wschat/backend/internal/wschat/domain"
)

type UserRepository interface {
	FindById(id domain.UserId) (*domain.User, error)
	FindByName(username string) (*domain.User, error)
}

type userRepository struct {
	db *sql.DB
}

func (r *userRepository) Create(username, password string) (*domain.User, error) {
	return nil, nil
}

func (r *userRepository) FindById(id domain.UserId) (*domain.User, error) {
	var users []*domain.User

	rows, err := r.db.Query("SELECT id, username, password, createdAt FROM users WHERE id = ? LIMIT 1", id)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var user *domain.User
		rows.Scan(&user.Id, &user.Username, &user.Password, &user.CreatedAt)
		users = append(users, user)
	}

	if len(users) == 0 {
		return nil, nil
	}

	return users[0], nil
}

func (r *userRepository) FindByName(username string) (*domain.User, error) {
	var users []*domain.User

	rows, err := r.db.Query("SELECT id, username, password FROM users WHERE username = ? LIMIT 1", username)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var user *domain.User
		rows.Scan(&user.Id, &user.Username, &user.Password)
		users = append(users, user)
	}

	if len(users) == 0 {
		return nil, nil
	}

	return users[0], nil
}

func NewUserRepository(db *sql.DB) UserRepository {
	return &userRepository{
		db: db,
	}
}
