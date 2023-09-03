package domain

import "time"

type MessageId string

type Message struct {
	id        MessageId
	userId    UserId
	roomId    RoomId
	text      string
	createdAt time.Time
}
