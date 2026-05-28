import type { IClock } from '@/core/domain/ports/IClock';
import Phaser from 'phaser';


export class PhaserClock implements IClock {

  private readonly scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }
  
  now(): number {
    return this.scene.time.now;
  }
}