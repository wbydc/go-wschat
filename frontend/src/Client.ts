export default class Client {
  private serverUrl: string;
  private socket: WebSocket;

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
    this.socket = new WebSocket(serverUrl);
  }

  public getServerUrl(): string {
    return this.serverUrl;
  }

  public async getRooms(): Promise<RoomInfo[]> {
    return [];
  }

  public async sendMessage(message: Partial<Message>): Promise<void> {}

  public onMessage(handler: MessageHandler): void {
    // this.socket.onmessage = handler;
  }

  public disconnect(): void {
    this.socket.close();
  }
}
