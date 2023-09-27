package domain

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
)

type UserId uuid.UUID

type User struct {
	Id        UserId    `json:"id"`
	Username  string    `json:"username"`
	Password  string    `json:"password,omitempty"`
	CreatedAt time.Time `json:"createdAt"`
}

type UserInfo struct {
	UserId UserId `json:"userId"`
	Token  string `json:"token"`
}

func (id UserId) String() string {
	idUUID := uuid.UUID(id)
	return idUUID.String()
}

func (id UserId) MarshalJSON() ([]byte, error) {
	return json.Marshal(id.String())
}
