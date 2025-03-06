import { ComplianceFile } from './compliance-file';
import { ComplianceHistoric } from './compliance-historic';
import { ComplianceLevel } from './compliance-level';
import { Recommendation } from './recommendation';

export class Compliance {
  id: number;
  number: string;
  measuresTaken: string;
  evaluationObs: string;

  evaluatedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  userCreatedId: number;
  userUpdatedId: number;

  level = new ComplianceLevel();
  recommendation = new Recommendation();

  files: ComplianceFile[];
  histories: ComplianceHistoric[];
}
