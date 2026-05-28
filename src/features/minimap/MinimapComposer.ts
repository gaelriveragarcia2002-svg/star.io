import type { IEventBus } from "@/core/domain/events/IEventBus";
import { MinimapService } from "./application/services/MinimapService";
import { MinimapView } from "./presentation/MinimapView";
import type { MinimapFeature } from "./MinimapFeature";

export class MinimapComposer {

  public static compose(
    scene: Phaser.Scene,
    eventBus: IEventBus,
  ): MinimapFeature {
    const service = new MinimapService(eventBus);
    const view = new MinimapView(scene, service);

    return {
      update: () => view.update()
    };
  }
}
