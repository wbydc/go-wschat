export type UUID = string;

export interface User {
  id: UUID;
  username: string;
  cratedAt: Date;
}

export interface UserInfo {
  id: User["id"];
  token: string;  
}

export interface Room {
  id: UUID;
  userId: UUID;
  title: string;
  cratedAt: Date;
}

export interface Message {
  id: UUID;
  userId: UUID;
  roomId: UUID;
  text: string;
  cratedAt: Date;
}
