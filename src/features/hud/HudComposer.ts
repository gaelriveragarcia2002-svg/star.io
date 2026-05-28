import type { IEventBus } from "@/core/domain/events/IEventBus";
import type { ExperienceService } from "../experience/application/services/ExperienceService";
import { ExperienceOrbCollectedEvent } from "../experience/domain/events/ExperienceOrbCollectedEvent";
import type { HudFeature } from "./HudFeature";

export class HudComposer {
  static compose(
    scene: Phaser.Scene,
    eventBus: IEventBus,
    experienceService: ExperienceService
  ): HudFeature {
    const syncHud = () => {
      levelText.setText(`Lv. ${experienceService.getLevel()}`);
      xpText.setText(`XP: ${experienceService.getXp()} / ${experienceService.getXpToNextLevel()}`);
    };

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

    syncHud();

    eventBus.subscribe<ExperienceOrbCollectedEvent>(
      ExperienceOrbCollectedEvent.eventName, syncHud
    );

    return {};
  }
}
