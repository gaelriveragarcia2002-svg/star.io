import type { DomainEvent } from '@/core/domain/events/DomainEvent';
import type { Vector2 } from '@/core/domain/value-objets/Vector2';

export class PlayerMovedEvent implements DomainEvent {
    // * Atributos de la clase.
    public readonly eventName = 'player.moved';
    public readonly occurredAt = new Date();
    public readonly playerId: string;
    public readonly position: Vector2;

    // * Constructor de la clase.
    constructor(playerId: string, position: Vector2) {
        this.playerId = playerId;
        this.position = position;
    }
}