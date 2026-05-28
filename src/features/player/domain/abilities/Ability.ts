export abstract class Ability {
  private _cooldownRemaining: number = 0;
  protected _remainingActive: number = 0;
  protected abstract readonly _cooldownMax: number;

  get canActivate(): boolean { return this._cooldownRemaining <= 0; }
  // Fracción 0–1, útil para mostrar en HUD.
  get cooldownProgress(): number { return this._cooldownRemaining / this._cooldownMax; }

  tick(delta: number): void {
    this._cooldownRemaining = Math.max(0, this._cooldownRemaining - delta);
    this._remainingActive   = Math.max(0, this._remainingActive   - delta);
  }

  // Cancela la activación actual. Disponible para cualquier habilidad.
  cancel(): void {
    this._remainingActive = 0;
  }

  protected tryActivate(): boolean {
    if (!this.canActivate) return false;
    this._cooldownRemaining = this._cooldownMax;
    return true;
  }
}
