import type { IEventBus } from "@/core/domain/events/IEventBus";
import { ExperienceOrbCollectedEvent } from "@/features/experience/domain/events/ExperienceOrbCollectedEvent";
import { LevelUpEvent } from "@/features/experience/domain/events/LevelUpEvent";
import { Level } from "@/features/experience/domain/entities/Level";


// * Servicio que se encarga de gestionar el estado de experiencia del usuario.
export class ExperienceService {
  private readonly level: Level;
  private readonly eventBus: IEventBus;

  constructor(eventBus: IEventBus, startingLevel: number = 1) {
    this.eventBus = eventBus;
    this.level = Level.createAtLevel(startingLevel);

    this.eventBus.subscribe<ExperienceOrbCollectedEvent>(
      ExperienceOrbCollectedEvent.eventName,
      (event) => this.addXp(event.xpAmount)
    );
  }

  private addXp(amount: number): void {
    const previousLevel = this.level.currentLevel;
    this.level.addXp(amount);
    this.level.levelUp();

    for (let l = previousLevel + 1; l <= this.level.currentLevel; l++) {
      this.eventBus.publish(new LevelUpEvent(l));
    }
  }

  getXp(): number { return this.level.currentXp; }
  getLevel(): number { return this.level.currentLevel; }
  getXpToNextLevel(): number { return this.level.xpToNextLevel; }
  getProgress(): number { return this.level.currentXp / this.level.xpToNextLevel; }
}
