export enum Stages {
  Login = "config",
  Rooms = "rooms",
  Chat = "chat",
  Preloader = "preloader",
}

export default class Stage {
  private current: Stages = Stages.Login;
  private sections: Record<Stages, HTMLElement>;

  constructor() {
    this.sections = {
      [Stages.Login]: document.getElementById(Stages.Login) as HTMLElement,
      [Stages.Rooms]: document.getElementById(Stages.Rooms) as HTMLElement,
      [Stages.Chat]: document.getElementById(Stages.Chat) as HTMLElement,
      [Stages.Preloader]: document.getElementById(Stages.Preloader) as HTMLElement,
    }
  }

  public getCurrent(): Stages {
    return this.current;
  }

  public show(stage: Stages): void {
    this.sections[this.current].classList.add("hidden");
    this.sections[stage].classList.remove("hidden");
  }

  public showLogin(): void {
    this.show(Stages.Login);
  }

  public showRooms(): void {
    this.show(Stages.Rooms);
  }

  public showChat(): void {
    this.show(Stages.Chat);
  }

  public showPreloader(): void {
    this.show(Stages.Preloader);
  }
}
