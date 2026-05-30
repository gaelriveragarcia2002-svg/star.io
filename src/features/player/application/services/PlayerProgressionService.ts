import type { IEventBus } from "@/core/domain/events/IEventBus";
import { LevelUpEvent } from "@/features/experience/domain/events/LevelUpEvent";
import type { Player } from "../../domain/entities/Player";

const SPEED_PER_LEVEL = 5;
const HEALTH_PER_LEVEL = 25;

// * Servicio que escucha eventos de subida de nivel y aumenta stats del jugador en consecuencia.
export class PlayerProgressionService {

    constructor(eventBus: IEventBus, player: Player, startingLevel: number = 1) {
        for (let l = 2; l <= startingLevel; l++) {
            this.applyLevelUp(player);
        }
        eventBus.subscribe<LevelUpEvent>(
            LevelUpEvent.eventName,
            (event) => this.onLevelUp(event, player)
        );
    }
    private onLevelUp(_event: LevelUpEvent, player: Player): void {
        this.applyLevelUp(player);
    }

    private applyLevelUp(player: Player): void {
        // * Se incrementa la velocidad del jugador.
        player.increaseSpeed(SPEED_PER_LEVEL);

        // * Se aumenta la vida maxima y se cura al jugador.
        player.health.increaseMax(HEALTH_PER_LEVEL);
        player.health.heal(HEALTH_PER_LEVEL);
    }
}