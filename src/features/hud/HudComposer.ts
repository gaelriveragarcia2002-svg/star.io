import type { IEventBus } from "@/core/domain/events/IEventBus";
import type { ExperienceService } from "../experience/application/services/ExperienceService";
import { ExperienceOrbCollectedEvent } from "../experience/domain/events/ExperienceOrbCollectedEvent";
import { LevelUpEvent } from "../experience/domain/events/LevelUpEvent";
import type { HudFeature } from "./HudFeature";
import type { Player } from "../player/domain/entities/Player";

const BAR_W = 200;
const BAR_H = 16;

export class HudComposer {
  static compose(
    scene: Phaser.Scene,
    eventBus: IEventBus,
    experienceService: ExperienceService,
    player: Player,
  ): HudFeature {

    const levelText = scene.add.text(16, 16, '', {
      fontFamily: 'monospace',
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 10, y: 4 }
    }).setDepth(100).setScrollFactor(0);

    const xpText = scene.add.text(16, 56, '', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#aaffaa',
      backgroundColor: '#00000088',
      padding: { x: 10, y: 4 }
    }).setDepth(100).setScrollFactor(0);

    const healthBarBg = scene.add.graphics()
      .setDepth(100).setScrollFactor(0);

    const healthBarFill = scene.add.graphics()
      .setDepth(101).setScrollFactor(0);

    const healthLabel = scene.add.text(16 + BAR_W + 8, 82, '', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#ffffff',
    }).setDepth(102).setScrollFactor(0);

    const syncHealthBar = () => {
      const pct = player.health.current / player.health.max;
      const r = Math.round(255 * (1 - pct));
      const g = Math.round(255 * pct);
      const fillColor = (r << 16) | (g << 8);

      healthBarBg.clear()
        .fillStyle(0x440000, 0.85)
        .fillRoundedRect(16, 82, BAR_W, BAR_H, 4);

      healthBarFill.clear()
        .fillStyle(fillColor, 1)
        .fillRoundedRect(16, 82, BAR_W * pct, BAR_H, 4);

      healthLabel.setText(`${player.health.current}/${player.health.max}`);
    };

    const syncHud = () => {
      levelText.setText(`Lv. ${experienceService.getLevel()}`);
      xpText.setText(`XP: ${experienceService.getXp()} / ${experienceService.getXpToNextLevel()}`);
      syncHealthBar();
    };

    syncHud();

    eventBus.subscribe<ExperienceOrbCollectedEvent>(ExperienceOrbCollectedEvent.eventName, syncHud);
    eventBus.subscribe<LevelUpEvent>(LevelUpEvent.eventName, syncHealthBar);

    return {};
  }
}
