import type { Feature } from '@/core/domain/events/Feature';
import type { Player } from './domain/entities/Player';
import type { PlayerView } from './presentation/PlayerView';
import type { PlayerProgressionService } from './application/services/PlayerProgressionService';

export interface PlayerFeature extends Feature {
  progression: PlayerProgressionService;
  player: Player;
  view: PlayerView;
  update: (deltaSeconds: number) => void;
}
