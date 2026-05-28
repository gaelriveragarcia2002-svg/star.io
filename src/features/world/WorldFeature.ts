import type { WorldBounds } from './domain/WorldBounds';

export interface WorldFeature {
  setCameraFollow: (target: Phaser.GameObjects.GameObject) => void;
  playableBounds: WorldBounds;
}
