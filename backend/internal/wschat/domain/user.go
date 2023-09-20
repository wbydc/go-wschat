package domain

import (
	"time"

	"github.com/google/uuid"
)

type UserId uuid.UUID

type User struct {
	Id        UserId
	Username  string
	Password  string
	CreatedAt time.Time
}
