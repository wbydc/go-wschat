package domain

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
)

type RoomId uuid.UUID

type Room struct {
	Id        RoomId    `json:"id"`
	UserId    UserId    `json:"userId"`
	Title     string    `json:"title"`
	Password  string    `json:"password,omitempty"`
	CreatedAt time.Time `json:"createdAt"`
}

func (id RoomId) String() string {
	idUUID := uuid.UUID(id)
	return idUUID.String()
}

func (id RoomId) MarshalJSON() ([]byte, error) {
	return json.Marshal(id.String())
}
