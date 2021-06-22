import { AuditFile } from './audit-file';
import { AuditReport } from './audit-report';
import { AuditStatus } from './audit-status';
import { AuditType } from './audit-type';
import { Entity } from './entity';
import { GroupWork } from './group-work';
import { Recommendation } from './recommendation';

export class Audit {
  id: number;
  number: string;
  year: string;
  processCode: string;
  description: string;

  dispatchedAt: Date;
  reportedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  userCreatedId: number;
  userUpdatedId: number;

  entityAuditor = new Entity();
  entityAudited = new Entity();
  groupWork = new GroupWork();
  status = new AuditStatus();
  type = new AuditType();

  recommendations: Recommendation[];
  reports: AuditReport[];
  files: AuditFile[];
}
