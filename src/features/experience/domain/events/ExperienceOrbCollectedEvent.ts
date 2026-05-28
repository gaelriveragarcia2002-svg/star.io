import type { DomainEvent } from '@/core/domain/events/DomainEvent';

export class ExperienceOrbCollectedEvent implements DomainEvent {

  // * Atributos de la clase.
  static readonly eventName = 'experience.orb-collected';
  public readonly playerId: string;
  public readonly orbId: string;
  public readonly xpAmount: number;
  public readonly eventName = ExperienceOrbCollectedEvent.eventName;
  public readonly occurredAt = new Date();

  // * Constructor de la clase.
  constructor(
    orbId: string,
    xpAmount: number,
    playerId: string
  ) {
    this.orbId = orbId;
    this.xpAmount = xpAmount;
    this.playerId = playerId;
  }
}
