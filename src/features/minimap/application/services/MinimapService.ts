import type { IEventBus } from "@/core/domain/events/IEventBus";
import type { MinimapEntity } from "../../domain/entities/MinimapEntity";

export class MinimapService {

  constructor(eventBus: IEventBus) {

  }

  getEntities(): MinimapEntity[] {
    return [];
  }
}
