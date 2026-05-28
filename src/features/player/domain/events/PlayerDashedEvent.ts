import type { DomainEvent } from "@/core/domain/events/DomainEvent";

export class PlayerDashedEvent implements DomainEvent {
    public static eventName: string = 'player.dashed';
    public eventName: string = PlayerDashedEvent.eventName;
    public occurredAt: Date = new Date();
    public playerId: string;

    constructor(playerId: string) {
        this.playerId = playerId;
    }
}
