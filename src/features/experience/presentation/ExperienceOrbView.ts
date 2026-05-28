import type { IEventBus } from '@/core/domain/events/IEventBus';
import Phaser from 'phaser';
import type { ExperienceOrb } from '../domain/entities/ExperienceOrb';
import { ExperienceOrbCollectedEvent } from '../domain/events/ExperienceOrbCollectedEvent';

export class ExperienceOrbView {
  private graphics: Phaser.GameObjects.Container;
  private readonly scene: Phaser.Scene;
  private readonly orb: ExperienceOrb;
  private readonly onCollected: (event: ExperienceOrbCollectedEvent) => void;

  constructor(
    scene: Phaser.Scene,
    orb: ExperienceOrb,
    eventBus: IEventBus
  ) {
    this.scene = scene;
    this.orb = orb;
    this.graphics = scene.add.container(orb.position.x, orb.position.y);

    // Glow exterior
    const glow = scene.add.circle(0, 0, orb.tier.radius + 4, orb.tier.color, 0.3);
    // Orbe principal
    const main = scene.add.circle(0, 0, orb.tier.radius, orb.tier.color);
    main.setStrokeStyle(2, 0xffffff, 0.8);

    this.graphics.add([glow, main]);

    // Animación de pulsación
    scene.tweens.add({
      targets: glow,
      scale: 1.3,
      alpha: 0.1,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Entrada con escala (efecto "pop")
    this.graphics.setScale(0);
    scene.tweens.add({
      targets: this.graphics,
      scale: 1,
      duration: 200,
      ease: 'Back.easeOut'
    });

    this.onCollected = (event) => {
      if (event.orbId === this.orb.id) {
        eventBus.unsubscribe(ExperienceOrbCollectedEvent.eventName, this.onCollected);
        this.playCollectAnimation();
      }
    };

    eventBus.subscribe<ExperienceOrbCollectedEvent>(
      ExperienceOrbCollectedEvent.eventName,
      this.onCollected
    );
  }

  private playCollectAnimation(): void {
    this.scene.tweens.add({
      targets: this.graphics,
      scale: 2.5,
      alpha: 0,
      duration: 250,
      ease: 'Cubic.easeOut',
      onComplete: () => this.graphics.destroy()
    });
  }
}
