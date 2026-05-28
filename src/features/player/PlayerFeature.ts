import type { Feature } from '@/core/domain/events/Feature';
import type { Player } from './domain/entities/Player';
import type { PlayerView } from './presentation/PlayerView';

export interface PlayerFeature extends Feature {
  player: Player;
  view: PlayerView;
  update: (deltaSeconds: number) => void;
}
