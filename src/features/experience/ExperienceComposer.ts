import type { IEventBus } from "@/core/domain/events/IEventBus";
import { PhaserClock } from "@/shared/infrastructure/PhaserClock";
import { PhaserRandomGenerator } from "@/shared/infrastructure/PhaserRandomGenerator";
import type { Player } from "../player/domain/entities/Player";
import { ExperienceService } from "./application/services/ExperienceService";
import { CollectExperienceUseCase } from "./application/use-cases/CollectExperienceUseCase";
import { SpawnExperienceOrbsUseCase } from "./application/use-cases/SpawnExperienceOrbsUseCase";
import type { ExperienceOrb } from "./domain/entities/ExperienceOrb";
import { ExperienceOrbSpawnedEvent } from "./domain/events/ExperienceOrbSpawnedEvent";
import { ExperienceOrbView } from "./presentation/ExperienceOrbView";
import type { WorldBounds } from "../world/domain/WorldBounds";
import type { ExperienceFeature } from "./ExperienceFeature";

export class ExperienceComposer {

  // * Método estático para componer la feature de experiencia.
  public static compose(
    scene: Phaser.Scene,
    eventBus: IEventBus,
    player: Player,
    playableBounds: WorldBounds,
    startingLevel: number = 1
  ): ExperienceFeature {

    const clock = new PhaserClock(scene);
    const random = new PhaserRandomGenerator();
    const orbs: ExperienceOrb[] = [];

    // Densidad objetivo: x orbes por cada 1M px². Se calcula sobre el área jugable.
    const targetDensity = 100; // x orbes por cada 1M px²
    const playableW = playableBounds.maxX - playableBounds.minX;
    const playableH = playableBounds.maxY - playableBounds.minY;
    const maxActiveOrbs = Math.round(targetDensity * (playableW * playableH) / 1_000_000);
    const orbSpawnInterval = 250;

    //* El servicio de experiencia se encarga de mantener el estado de la experiencia y nivel del jugador. Se crea aquí porque es un punto de integración entre la lógica de experiencia y la presentación (HUD).
    const experience = new ExperienceService(eventBus, startingLevel);

    //* Los orbes spawnean dentro de la zona jugable con un margen de 50px.
    const spawnUseCase = new SpawnExperienceOrbsUseCase(
      eventBus,
      clock,
      random,
      {
        minX: playableBounds.minX + 50,
        maxX: playableBounds.maxX - 50,
        minY: playableBounds.minY + 50,
        maxY: playableBounds.maxY - 50,
      },
      orbSpawnInterval
    );

    const collectUseCase = new CollectExperienceUseCase(eventBus);

    //* Cuando se spawnea un orbe, agregar a la lista y crear su vista.
    eventBus.subscribe<ExperienceOrbSpawnedEvent>(
      ExperienceOrbSpawnedEvent.eventName,
      (event) => {
        orbs.push(event.orb);
        new ExperienceOrbView(scene, event.orb, eventBus);
      }
    );

    return {
      experience: experience,
      update: () => {
        if (orbs.length < maxActiveOrbs) spawnUseCase.execute();
        collectUseCase.execute(player, orbs);
      }
    };
  }
}
