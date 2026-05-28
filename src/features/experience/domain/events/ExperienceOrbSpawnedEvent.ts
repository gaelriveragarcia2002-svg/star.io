import type { DomainEvent } from "@/core/domain/events/DomainEvent";
import type { ExperienceOrb } from "../entities/ExperienceOrb";

export class ExperienceOrbSpawnedEvent implements DomainEvent {

    // * Atributos de la clase.
    static readonly eventName = 'experience.orb-spawned';
    public readonly eventName = ExperienceOrbSpawnedEvent.eventName;
    public readonly occurredAt = new Date();
    public readonly orb: ExperienceOrb;

    // * Constructor de la clase.
    constructor(orb: ExperienceOrb) {
        this.orb = orb;
    }
}
