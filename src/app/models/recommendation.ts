import { Audit } from './audit';
import { Compliance } from './compliance';
import { RecommendationCharacter } from './recommendation-character';
import { RecommendationFile } from './recommendation-file';
import { RecommendationLevelRisk } from './recommendation-level-risk';
import { RecommendationNature } from "./recommendation-nature";
import { RecommendationStatus } from './recommendation-status';

export class Recommendation {
  id: number;
  number?: string;
  description: string;
  constatation: string;
  amount: number;

  complianceDeadline: Date;
  createdAt: Date;
  updatedAt: Date;

  userCreatedId: number;
  userUpdatedId: number;

  audit = new Audit();
  status = new RecommendationStatus();
  nature = new RecommendationNature();
  character = new RecommendationCharacter();
  levelRisk = new RecommendationLevelRisk();

  files: RecommendationFile[];
  compliances: Compliance[];
}
