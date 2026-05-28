import Phaser from 'phaser';
import { PLAYABLE_WIDTH, PLAYABLE_HEIGHT } from './domain/world.constants';
import type { WorldBounds } from './domain/WorldBounds';
import type { WorldFeature } from './WorldFeature';

export class WorldComposer {

  public static compose(scene: Phaser.Scene): WorldFeature {
    // El padding es exactamente la mitad del viewport en cada eje.
    // Así, cuando el jugador está en el borde de la zona jugable, la cámara
    // aún tiene medio screen de mundo disponible y puede seguir centrada.
    const padX = scene.scale.width / 2;
    const padY = scene.scale.height / 2;

    const totalWidth  = PLAYABLE_WIDTH  + padX * 2;
    const totalHeight = PLAYABLE_HEIGHT + padY * 2;

    const playableBounds: WorldBounds = {
      minX: padX,
      minY: padY,
      maxX: padX + PLAYABLE_WIDTH,
      maxY: padY + PLAYABLE_HEIGHT,
    };

    scene.cameras.main.setBounds(0, 0, totalWidth, totalHeight);
    scene.cameras.main.setBackgroundColor('#1a1a2e');

    this.drawBackground(scene, totalWidth, totalHeight);
    this.drawPlayableAreaBorder(scene, playableBounds);

    return {
      setCameraFollow: (target) => {
        scene.cameras.main.startFollow(target, true, 0.1, 0.1);
      },
      playableBounds,
    };
  }

  // Grid que cubre el mundo total (zona jugable + padding).
  private static drawBackground(scene: Phaser.Scene, width: number, height: number): void {
    const graphics = scene.add.graphics();
    graphics.lineStyle(1, 0xffffff, 0.05);
    for (let x = 0; x <= width; x += 80) {
      graphics.lineBetween(x, 0, x, height);
    }
    for (let y = 0; y <= height; y += 80) {
      graphics.lineBetween(0, y, width, y);
    }
  }

  // Borde visual que delimita donde termina el área jugable.
  private static drawPlayableAreaBorder(scene: Phaser.Scene, bounds: WorldBounds): void {
    const graphics = scene.add.graphics();
    const w = bounds.maxX - bounds.minX;
    const h = bounds.maxY - bounds.minY;
    graphics.lineStyle(2, 0xff4444, 0.4);
    graphics.strokeRect(bounds.minX, bounds.minY, w, h);
  }
}
