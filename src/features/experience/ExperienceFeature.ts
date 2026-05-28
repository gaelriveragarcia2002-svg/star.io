import type { PlayerProgressionService } from '../player/application/services/PlayerProgressionService';
import type { ExperienceService } from './application/services/ExperienceService';

export interface ExperienceFeature {
  progression: PlayerProgressionService;
  experience: ExperienceService;
  update: () => void;
}
