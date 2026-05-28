import Phaser from 'phaser';
import { PhaserEventBus } from '@/shared/infrastructure/PhaseEventBus';
import type { OnCreate } from '@/shared/infrastructure/scene-lifecycle/OnCreate';
import type { OnUpdate } from '@/shared/infrastructure/scene-lifecycle/OnUpdate';
import { ExperienceComposer } from '@/features/experience/ExperienceComposer';
import type { ExperienceFeature } from '@/features/experience/ExperienceFeature';
import { PlayerComposer } from '@/features/player/PlayerComposer';
import type { PlayerFeature } from '@/features/player/PlayerFeature';
import { HudComposer } from '@/features/hud/HudComposer';
import type { HudFeature } from '@/features/hud/HudFeature';
import { WorldComposer } from '@/features/world/WorldComposer';
import type { WorldFeature } from '@/features/world/WorldFeature';

// Escena = composition root. Aquí se ensamblan dependencias y se conectan dominio, aplicación y presentación.
export class GameScene extends Phaser.Scene implements OnCreate, OnUpdate {

  private eventBus!: PhaserEventBus;
  private worldFeature!: WorldFeature;
  private experienceFeature!: ExperienceFeature;
  private playerFeature!: PlayerFeature;
  private hudFeature!: HudFeature;

  constructor() {
    super({ key: 'GameScene' });
  }

  public create(): void {
    //* 0. Composición de la feature del mundo, que no depende de nada. El resultado de esta composición (playableBounds) se usará para configurar otras features. Por eso se compone antes que las demás.
    this.worldFeature = WorldComposer.compose(this);

    //* 1. Infraestructura compartida, como el event bus.
    this.eventBus = new PhaserEventBus();

    //* 2. Composición de features
    const startingLevel = 30;
    this.playerFeature = PlayerComposer.compose(this, this.eventBus, this.worldFeature.playableBounds);
    this.experienceFeature = ExperienceComposer.compose(this, this.eventBus, this.playerFeature.player, this.worldFeature.playableBounds, startingLevel);
    this.hudFeature = HudComposer.compose(this, this.eventBus, this.experienceFeature.experience);

    //* 3. Integración entre features.
    this.worldFeature.setCameraFollow(this.playerFeature.view.gameObject);

    //* 4. Limpieza al cerrar escena
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.eventBus.destroy());
  }

  public update(_time: number, deltaMs: number): void {
    const deltaSeconds = deltaMs / 1000;
    this.playerFeature.update(deltaSeconds);
    this.experienceFeature.update();
  }
}
