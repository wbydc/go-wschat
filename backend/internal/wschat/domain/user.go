package domain

import "github.com/google/uuid"

type UserId uuid.UUID

type User struct {
	id   UserId
	name string
}
