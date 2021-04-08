import { ComplianceFile } from './compliance-file';
import { ComplianceLevel } from './compliance-level';
import { Recommendation } from './recommendation';

export class Compliance {
  id: number;
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
}
