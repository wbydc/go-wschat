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
	row := r.db.QueryRow(
		"INSERT INTO \"Users\" (id, username, password) VALUES ($1, $2, $3) RETURNING *",
		uuid.New(),
		username,
		password,
	)

	user, err := r.scanRow(row)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return user, nil
}

func (r *userRepository) FindById(id domain.UserId) (*domain.User, error) {
	row := r.db.QueryRow(
		"SELECT id, username, password, \"createdAt\" FROM \"Users\" WHERE id = $1 LIMIT 1",
		id.String(),
	)

	user, err := r.scanRow(row)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return user, nil
}

func (r *userRepository) FindByName(username string) (*domain.User, error) {
	row := r.db.QueryRow(
		"SELECT id, username, password, \"createdAt\" FROM \"Users\" WHERE username = $1 LIMIT 1",
		username,
	)

	user, err := r.scanRow(row)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return user, nil
}

func (r *userRepository) FindMany() ([]*domain.User, error) {
	rows, err := r.db.Query("SELECT id, username, password, \"createdAt\" FROM \"Users\"")
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	users, err := r.scanRows(rows)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return users, nil
}

func (r *userRepository) scanRow(row *sql.Row) (*domain.User, error) {
	var userId uuid.NullUUID
	var room domain.User

	err := row.Scan(
		&userId,
		&room.Username,
		&room.Password,
		&room.CreatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	room.Id = domain.UserId(userId.UUID)

	return &room, nil
}

func (r *userRepository) scanRows(rows *sql.Rows) ([]*domain.User, error) {
	var users []*domain.User

	defer rows.Close()
	for rows.Next() {
		var userId uuid.NullUUID
		var user *domain.User

		err := rows.Scan(&userId, &user.Username, &user.Password, &user.CreatedAt)
		if err != nil {
			log.Fatal(err)
		}

		user.Id = domain.UserId(userId.UUID)

		users = append(users, user)
	}

	return users, nil
}

func NewUserRepository(db *sql.DB) UserRepository {
	return &userRepository{
		db: db,
	}
}
