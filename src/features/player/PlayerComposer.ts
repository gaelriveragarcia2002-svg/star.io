import Phaser from 'phaser';
import { Vector2 } from '@/core/domain/value-objets/Vector2';
import { PhaserKeyboardInput } from '@/shared/infrastructure/PhaserKeyboardInput';
import { Player } from './domain/entities/Player';
import { MovePlayerUseCase } from './application/use-cases/MovePlayerUseCase';
import { PlayerView } from './presentation/PlayerView';
import type { IEventBus } from '@/core/domain/events/IEventBus';
import type { WorldBounds } from '../world/domain/WorldBounds';
import type { PlayerFeature } from './PlayerFeature';
import { DashPlayerUseCase } from './application/use-cases/DashPlayerUseCase';

export class PlayerComposer {

  public static compose(scene: Phaser.Scene, eventBus: IEventBus, playableBounds: WorldBounds): PlayerFeature {
    const inputProvider = new PhaserKeyboardInput(scene);

    // Spawn en el centro exacto de la zona jugable.
    const spawnX = (playableBounds.minX + playableBounds.maxX) / 2;
    const spawnY = (playableBounds.minY + playableBounds.maxY) / 2;
    const player = Player.create('player-1', new Vector2(spawnX, spawnY), 250, 100);

    const movePlayerUseCase = new MovePlayerUseCase(inputProvider, eventBus);
    const dashPlayerUseCase = new DashPlayerUseCase(inputProvider, eventBus);
    const view = new PlayerView(scene, player, eventBus);

    return {
      player,
      view,
      update: (deltaSeconds: number) => {
        // * Ejecutar los casos de uso de movimiento y dash del jugador, que leen el estado de las entradas y actualizan la posición del jugador en consecuencia.
        movePlayerUseCase.execute(player, deltaSeconds);
        dashPlayerUseCase.execute(player, deltaSeconds);

        //*  Clampea la posición para que el jugador nunca salga de la zona jugable.
        player.constrainTo(playableBounds.minX, playableBounds.minY, playableBounds.maxX, playableBounds.maxY);

        // * Sincroniza la vista del jugador con su posición actualizada.
        view.sync();
      }
    };
  }
}
