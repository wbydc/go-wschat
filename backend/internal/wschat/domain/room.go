package domain

import "github.com/google/uuid"

type RoomId uuid.UUID

type Room struct {
	id     RoomId
	userId UserId
	title  string
}
