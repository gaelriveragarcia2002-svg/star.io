import type { ExperienceService } from './application/services/ExperienceService';

export interface ExperienceFeature {
  experience: ExperienceService;
  update: () => void;
}
