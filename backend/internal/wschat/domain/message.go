package domain

import (
	"time"

	"github.com/google/uuid"
)

type MessageId uuid.UUID

type Message struct {
	Id        MessageId
	UserId    UserId
	RoomId    RoomId
	Text      string
	CreatedAt time.Time
}
