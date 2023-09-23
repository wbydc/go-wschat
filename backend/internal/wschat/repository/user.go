package repository

import (
	"database/sql"
	"log"

	"github.com/google/uuid"
	"github.com/wbydc/go-wschat/backend/internal/wschat/domain"
)

type UserRepository interface {
	Create(username, password string) (*domain.User, error)
	FindById(id domain.UserId) (*domain.User, error)
	FindByName(username string) (*domain.User, error)
}

type userRepository struct {
	db *sql.DB
}

func (r *userRepository) Create(username, password string) (*domain.User, error) {
	var userId uuid.NullUUID
	var user domain.User

	err := r.db.QueryRow("INSERT INTO \"Users\" (id, username, password) VALUES ($1, $2, $3) RETURNING *", uuid.New(), username, password).Scan(&userId, &user.Username, &user.Password, &user.CreatedAt)

	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	user.Id = domain.UserId(userId.UUID)

	return &user, nil
}

func (r *userRepository) FindById(id domain.UserId) (*domain.User, error) {
	var userId uuid.NullUUID
	var user domain.User

	err := r.db.QueryRow("SELECT id, username, password, \"createdAt\" FROM \"Users\" WHERE id = $1 LIMIT 1", id.String()).Scan(&userId, &user.Username, &user.Password, &user.CreatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}

		log.Fatal(err)
		return nil, err
	}

	user.Id = domain.UserId(userId.UUID)

	return &user, nil
}

func (r *userRepository) FindByName(username string) (*domain.User, error) {
	var userId uuid.NullUUID
	var user domain.User

	err := r.db.QueryRow("SELECT id, username, password, \"createdAt\" FROM \"Users\" WHERE username = $1 LIMIT 1", username).Scan(&userId, &user.Username, &user.Password, &user.CreatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}

		log.Fatal(err)
		return nil, err
	}

	user.Id = domain.UserId(userId.UUID)

	return &user, nil
}

func (r *userRepository) FindMany() ([]*domain.User, error) {
	var users []*domain.User

	rows, err := r.db.Query("SELECT id, username, password FROM \"Users\"")
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var user *domain.User
		err := rows.Scan(&user.Id, &user.Username, &user.Password)
		if err != nil {
			log.Fatal(err)
		}
		users = append(users, user)
	}

	return users, nil
}

func NewUserRepository(db *sql.DB) UserRepository {
	return &userRepository{
		db: db,
	}
}
