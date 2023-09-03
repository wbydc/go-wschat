package domain

type RoomId string

type Room struct {
	id     RoomId
	userId UserId
	title  string
}
