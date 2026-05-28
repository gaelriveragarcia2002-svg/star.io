import { Ability } from './Ability';
import { Vector2 } from '@/core/domain/value-objets/Vector2';

export class DashAbility extends Ability {
  protected readonly _cooldownMax: number = 5;
  readonly activeDuration: number = 1;
  // Porcentaje de la velocidad base que se suma durante el boost (0.5 = +50%).
  // Al escalar con la velocidad base, el dash siempre se siente proporcional.
  readonly boostAmountPercent: number = 1.5;

  private _activationDirection: Vector2 | null = null;

  get isActive(): boolean { return this._remainingActive > 0; }

  // Progreso ease-out de 1→0 durante el boost. Player lo usa para calcular el boost real.
  get currentProgress(): number {
    if (!this.isActive) return 0;
    const progress = this._remainingActive / this.activeDuration; // 1→0
    return progress * progress;
  }

  // Activa el dash guardando la dirección de activación.
  activate(direction: Vector2): boolean {
    if (!super.tryActivate()) return false;
    this._remainingActive = this.activeDuration;
    this._activationDirection = direction.normalize();
    return true;
  }

  // Cancela el boost si la nueva dirección es opuesta a la original (dot < 0 = más de 90°).
  checkDirectionCancel(newDirection: Vector2): void {
    if (!this.isActive || !this._activationDirection) return;
    const n = newDirection.normalize();
    const dot = n.x * this._activationDirection.x + n.y * this._activationDirection.y;
    if (dot < 0) this.cancel();
  }

  override cancel(): void {
    super.cancel();
    this._activationDirection = null;
  }
}
