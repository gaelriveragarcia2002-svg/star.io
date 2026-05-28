import type { IEventBus } from "@/core/domain/events/IEventBus";
import type { UseCase } from "@/core/domain/events/UseCase";
import type { IInputProvider } from "@/core/domain/ports/IInputProvider";
import type { Player } from "../../domain/entities/Player";
import { Vector2 } from "@/core/domain/value-objets/Vector2";
import { PlayerDashedEvent } from "../../domain/events/PlayerDashedEvent";

export class DashPlayerUseCase implements UseCase {
    private readonly inputProvider: IInputProvider;
    private readonly eventBus: IEventBus;

    constructor(inputProvider: IInputProvider, eventBus: IEventBus) {
        this.inputProvider = inputProvider;
        this.eventBus = eventBus;
    }

    public execute(player: Player, deltaSeconds: number): void {
        player.dash.tick(deltaSeconds);

        const input = this.inputProvider.getState();
        if (!input.dash) return;

        const direction = new Vector2(
            (input.right ? 1 : 0) - (input.left ? 1 : 0),
            (input.down ? 1 : 0) - (input.up ? 1 : 0)
        );
        if (direction.x === 0 && direction.y === 0) return;

        if (!player.dash.activate(direction)) return;

        this.eventBus.publish(new PlayerDashedEvent(player.id));
    }
}
