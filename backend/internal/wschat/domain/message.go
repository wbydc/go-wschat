package domain

import (
	"time"

	"github.com/google/uuid"
)

type MessageId uuid.UUID

type Message struct {
	id        MessageId
	userId    UserId
	roomId    RoomId
	text      string
	createdAt time.Time
}
