export class TestId {
  public baseId: string;

  constructor(id: string) {
    this.baseId = id;
  }

  get id() {
    return this.toString();
  }

  private toString() {
    return `[data-testid="${this.baseId}"]`;
  }

  static generateId(id: string) {
    return `[data-testid="${id}"]`;
  }
}
