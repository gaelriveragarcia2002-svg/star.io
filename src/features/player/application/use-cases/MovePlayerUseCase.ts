import { Vector2 } from '@/core/domain/value-objets/Vector2'; 
import type { IEventBus } from '@/core/domain/events/IEventBus'; 
import type { IInputProvider } from '@/core/domain/ports/IInputProvider'; 
import { Player } from '../../domain/entities/Player';
import { PlayerMovedEvent } from '../../domain/events/PlayerMovedEvent';
import type { UseCase } from '@/core/domain/events/UseCase';

export class MovePlayerUseCase implements UseCase {
    private readonly inputProvider: IInputProvider;
    private readonly eventBus: IEventBus;

    constructor(
        inputProvider: IInputProvider,
        eventBus: IEventBus
    ) {
        this.inputProvider = inputProvider;
        this.eventBus = eventBus;
    }

    public execute(player: Player, deltaSeconds: number): void {
        // * Obtiene el estado actual de las entradas del jugador.
        const input = this.inputProvider.getState();

        // * Calcula la dirección de movimiento basada en las entradas.
        const direction = new Vector2(
            (input.right ? 1 : 0) - (input.left ? 1 : 0),
            (input.down ? 1 : 0) - (input.up ? 1 : 0)
        );

        // * Si no hay dirección (no se presionan teclas de movimiento), no hace nada.
        if (direction.x === 0 && direction.y === 0) return;

        // * Mueve al jugador en la dirección calculada, escalada por su velocidad y el delta de tiempo.
        player.move(direction, deltaSeconds);

        // * Publica un evento de que el jugador se ha movido, incluyendo su nueva posición.
        this.eventBus.publish(new PlayerMovedEvent(player.id, player.position));
    }
}