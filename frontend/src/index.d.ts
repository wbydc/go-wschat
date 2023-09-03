type UserId = string;
type RoomId = string;
type MessageId = string;
type MessageType = "message" | "system";

interface RoomInfo {
  id: RoomId;
  title: string;
  createdAt: string;
}

interface Message {
  id: MessageId;
  type: MessageType;
  roomId: RoomId;
  text: string;
  userId: UserId;
  createdAt: string;
}

type MessageHandler = (message: Message) => void;
