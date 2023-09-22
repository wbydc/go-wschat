package domain

import (
	"time"

	"github.com/google/uuid"
)

type RoomId uuid.UUID

type Room struct {
	Id        RoomId
	UserId    UserId
	Title     string
	CreatedAt time.Time
}
