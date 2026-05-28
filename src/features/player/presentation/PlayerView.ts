import Phaser from 'phaser';
import { Player } from '../domain/entities/Player';
import type { IEventBus } from '@/core/domain/events/IEventBus';
import { PlayerDashedEvent } from '../domain/events/PlayerDashedEvent';

export class PlayerView {

  private scene: Phaser.Scene;
  private graphics: Phaser.GameObjects.Container;
  private body: Phaser.GameObjects.Arc;
  private eye: Phaser.GameObjects.Arc;
  private player: Player;
  private eventBus: IEventBus;

  private debugText!: Phaser.GameObjects.Text;
  private speedText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, player: Player, eventBus: IEventBus) {
    const pos = player.position;
    this.scene = scene;
    this.eventBus = eventBus;
    this.player = player;
    this.graphics = scene.add.container(pos.x, pos.y);
    this.body = scene.add.circle(0, 0, 16, 0x4fc3f7);
    this.body.setStrokeStyle(2, 0xffffff);
    this.eye = scene.add.circle(5, -3, 3, 0x0a0a0f);
    this.graphics.add([this.body, this.eye]);

    this.setDebugValues();

    // Flash de color durante la duración del boost de dash.
    this.eventBus.subscribe<PlayerDashedEvent>(PlayerDashedEvent.eventName, () => {
      this.playDashBoostEffect();
    });
  }

  private setDebugValues(): void {
    this.drawPlayerHitbox();
    this.debugText = this.scene.add.text(0, 20, '', {
      fontSize: '20px',
      color: '#ffffff'
    }).setOrigin(0.5);
    this.speedText = this.scene.add.text(0, 40, '', {
      fontSize: '16px',
      color: '#aaffaa'
    }).setOrigin(0.5);
    this.graphics.add(this.debugText);
    this.graphics.add(this.speedText);
  }

  private drawPlayerHitbox(): void {
    const hitbox = this.scene.add.circle(0, 0, this.player.hitboxRadius, 0xff0000, 0.3);
    this.graphics.add(hitbox);
  }

  // Flash blanco que dura exactamente el tiempo del boost y vuelve al color original.
  private playDashBoostEffect(): void {
    const boostMs = this.player.dash.activeDuration * 1000;
    this.body.setFillStyle(0xffffff);
    this.scene.time.delayedCall(boostMs, () => {
      this.body.setFillStyle(0x4fc3f7);
    });
  }

  public sync(): void {
    const pos = this.player.position;
    this.graphics.x = pos.x;
    this.graphics.y = pos.y;
    this.debugText.setText(`(${Math.round(pos.x)}, ${Math.round(pos.y)})`);
    const boost = this.player.speed * this.player.dash.boostAmountPercent * this.player.dash.currentProgress;
    this.speedText.setText(`Speed: ${Math.round(this.player.speed + boost)}px/s`);
  }

  public destroy(): void {
    this.graphics.destroy();
  }

  public get gameObject(): Phaser.GameObjects.Container {
    return this.graphics;
  }
}
