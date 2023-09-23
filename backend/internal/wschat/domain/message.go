package domain

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
)

type MessageId uuid.UUID

type Message struct {
	Id        MessageId `json:"id"`
	UserId    UserId    `json:"userId"`
	RoomId    RoomId    `json:"roomId"`
	Text      string    `json:"text"`
	CreatedAt time.Time `json:"createdAt"`
}

func (id MessageId) String() string {
	idUUID := uuid.UUID(id)
	return idUUID.String()
}

func (id MessageId) MarshalJSON() ([]byte, error) {
	return json.Marshal(id.String())
}
