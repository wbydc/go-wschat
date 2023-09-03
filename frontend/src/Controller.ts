import Client from './Client';
import Context from './Context';

export default class Controller {
  private ctx: Context;
  private content: HTMLElement | null;
  private chatInput: HTMLElement | null;
  private configInput: HTMLElement | null;

  constructor() {
    this.ctx = new Context();
    this.content = document.getElementById("chat-content");
    this.chatInput = document.getElementById("chat-input");
    this.configInput = document.getElementById("config-input");
  }

  public setupHooks(): void {
    this.chatInput!.onsubmit = this.onSendHook.bind(this);
    this.configInput!.onsubmit = this.onConfigHook.bind(this);

    this.ctx.getClient()?.onMessage(this.onMessageHook.bind(this));
    console.log("hooks set");
  }

  public setRoom(room: RoomInfo): void {
    const client = this.ctx.getClient();
    if (!client) {
      throw new Error("Client not set, can't enter the room");
    }
    const serverUrl: string = client.getServerUrl();
    document.title = room.title + " at " + serverUrl;

    this.ctx.getStage().showChat();
  }

  public addRoom(room: RoomInfo): void {
  }

  public onMessageHook(message: Message): void {
    const elem: HTMLElement = this.buildFromMessage(message);
    this.content?.appendChild(elem);
  }

  private onConfigHook(event: SubmitEvent): void {
    event.preventDefault();
    const formData: FormData = new FormData(this.configInput as HTMLFormElement);
    const serverUrl: string = formData.get("server") as string;
    const username: string = formData.get("username") as string;

    this.ctx.getStage().showPreloader();
    console.log(serverUrl, username);
    
  }

  private onSendHook(event: SubmitEvent): void {
    event.preventDefault();
    const formData: FormData = new FormData(this.chatInput as HTMLFormElement);
    const text: string = formData.get("text") as string;
    (this.chatInput as HTMLFormElement).reset();

    const roomId: RoomId | null = this.ctx.getRoomId();
    if (!roomId) {
      throw new Error("RoomId not set, message can't be sent");
    }

    const client: Client | null = this.ctx.getClient();
    if (!client) {
      throw new Error("Client not set, message can't be sent");
    }

    const message: Partial<Message> = {
      roomId,
      text,
    };
    client.sendMessage(message);
  }

  private buildFromMessage(message: Message): HTMLElement {
    const self: boolean = message.userId === this.ctx.getUserId();
    const html: string = `
      <div class="flex w-full mt-2 space-x-3 max-w-xs ${self ? "ml-auto justify-end" : ""}">
        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
        <div>
          <div class="bg-${self ? "blue-600" : "gray-300"} p-3 rounded-r-lg rounded-bl-lg">
            <p class="text-sm">${message.text}</p>
          </div>
          <span class="text-xs text-gray-500 leading-none">${message.createdAt}</span>
        </div>
      </div>
    `;

    const elem: HTMLElement = document.createElement("div");
    elem.innerHTML = html;

    return elem;
  }
}
