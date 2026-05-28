export class Health {
  private _current: number;
  private _max: number;

  constructor(max: number) {
    this._max = max;
    this._current = max;
  }

  heal(amount: number): void {
    this._current = Math.min(this._current + amount, this._max);
  }

  takeDamage(amount: number): void {
    this._current = Math.max(0, this._current - amount);
  }

  increaseMax(amount: number): void {
    this._max += amount;
  }

  get current(): number { return this._current; }
  get max(): number { return this._max; }
  get isDead(): boolean { return this._current <= 0; }
}
