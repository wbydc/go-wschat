const configKeys: string[] = [
  "server",
  "room",
];

export default class Config {
  private config: Map<string, string> = new Map<string, string>();

  public has(key: string): boolean {
    return this.config.has(key);
  }

  public get(key: string): string | null {
    return this.config.get(key) || null;
  }

  public loadFromUrl(url?: string): void {
    if (!url) {
      url = window.location.search;
    }
    const urlParams = new URLSearchParams(url);

    for (const entry of urlParams.entries()) {
      if (!this.config.has(entry[0])) {
        this.config.set(entry[0], entry[1]);
      }
    }
  }

  public loadFromLocalStorage(): void {
    // TODO: implement
  }
}
