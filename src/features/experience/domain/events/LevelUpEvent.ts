import type { DomainEvent } from "@/core/domain/events/DomainEvent";

export class LevelUpEvent implements DomainEvent {
    public static readonly eventName = 'LevelUpEvent';
    public readonly eventName = LevelUpEvent.eventName;
    public readonly occurredAt = new Date();
    public readonly newLevel: number;

    constructor(newLevel: number) {
        this.newLevel = newLevel;
    }
}
