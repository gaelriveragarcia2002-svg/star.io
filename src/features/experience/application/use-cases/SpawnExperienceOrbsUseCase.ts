import type { IEventBus } from "@/core/domain/events/IEventBus";
import type { IClock } from "@/core/domain/ports/IClock";
import type { IRandomGenerator } from "@/core/domain/ports/IRandomGenerator";
import { ExperienceOrb } from "../../domain/entities/ExperienceOrb";
import { ExperienceTier } from "@/core/domain/value-objets/ExperienceTier";
import { Vector2 } from "@/core/domain/value-objets/Vector2";
import { ExperienceOrbSpawnedEvent } from "../../domain/events/ExperienceOrbSpawnedEvent";
import type { UseCase } from "@/core/domain/events/UseCase";


export interface SpawnAreaBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/**
 ** Spawnea orbes de experiencia periódicamente en posiciones aleatorias
 ** dentro de un área del mapa. La rareza está pesada por la weight de cada tier.
 */
export class SpawnExperienceOrbsUseCase implements UseCase {
    private nextSpawnAt: number;
    private orbsSpawned = 0;
    private readonly eventBus: IEventBus;
    private readonly clock: IClock;
    private readonly random: IRandomGenerator;
    private readonly bounds: SpawnAreaBounds;
    private readonly intervalMs: number;

    constructor(
        eventBus: IEventBus,
        clock: IClock,
        random: IRandomGenerator,
        bounds: SpawnAreaBounds,
        intervalMs: number
    ){
        this.eventBus = eventBus;
        this.clock = clock;
        this.random = random;
        this.bounds = bounds;
        this.intervalMs = intervalMs;
        this.nextSpawnAt = this.clock.now() + this.intervalMs;
    }

    /**
     * Llamar cada frame. Si llegó el momento de spawnear, crea un orbe.
     * @returns El orbe creado o null si no era momento.
    */
    public execute(): ExperienceOrb | null {
        if (this.clock.now() < this.nextSpawnAt) return null;

        const orb = this.createRandomOrb();
        this.eventBus.publish(new ExperienceOrbSpawnedEvent(orb));

        this.nextSpawnAt = this.clock.now() + this.intervalMs;
        return orb;
    }

    // * Métodos auxiliares */
    private createRandomOrb(): ExperienceOrb {
        const tier = this.pickWeightedTier();
        const position = this.pickRandomPosition();
        const id = `xp-orb-${this.orbsSpawned++}`;
        return ExperienceOrb.create(id, position, tier);
    }

    /**
     * Selección por peso: tira un número entre 0 y la suma total de weights,
     * recorre los tiers acumulando y devuelve el primero que pasa el umbral.
     * Patrón estándar de "weighted random pick".
     */
    private pickWeightedTier(): ExperienceTier {
        // total weight = 70 + 20 + 8 + 2 = 100 (en este caso es conveniente que sumen 100, pero no es obligatorio)
        const totalWeight = ExperienceTier.ALL.reduce((sum, t) => sum + t.weight, 0);
        // roll entre 0 y totalWeight
        let roll = this.random.rangeFloat(0, totalWeight);

        // recorre los tiers y devuelve el primero que pasa el umbral.
        for (const tier of ExperienceTier.ALL) {
            roll -= tier.weight;
            if (roll <= 0) return tier;
        }

        return ExperienceTier.SMALL; // fallback (no debería ocurrir)
    }

    private pickRandomPosition(): Vector2 {
        return new Vector2(
            this.random.rangeInt(this.bounds.minX, this.bounds.maxX),
            this.random.rangeInt(this.bounds.minY, this.bounds.maxY)
        );
    }
}
