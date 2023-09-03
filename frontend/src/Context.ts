import Client from './Client';
import Config from './Config';
import Stage from './Stage';

export default class Context {
  private stage: Stage;
  private config: Config;
  private client: Client | null = null;
  private userId: UserId | null = null;
  private roomId: RoomId | null = null;
  private rooms: Record<RoomId, RoomInfo> = {};
  private messages: Record<MessageId, Message> = {};

  constructor() {
    this.stage = new Stage();
    this.config = new Config();

    this.config.loadFromUrl();
    if (this.config.has("server")) {
      const server: string = this.config.get("server") as string;
      this.setServer(server);
    }
  }

  public getStage(): Stage {
    return this.stage;
  }

  public setRoomId(roomId: RoomId): void {
    this.roomId = roomId;
  }

  public getRoomId(): RoomId | null {
    return this.roomId;
  }

  public setRooms(rooms: Record<RoomId, RoomInfo>): void {
    this.rooms = rooms;
  }

  public getRooms(): Record<RoomId, RoomInfo> {
    return this.rooms;
  }

  public getUserId(): UserId | null {
    return this.userId;
  }

  public setServer(server: string): void {
    this.client = new Client(server);
  }

  public getClient(): Client | null {
    return this.client;
  }
}
