import { AuditFile } from './audit-file';
import { AuditStatus } from './audit-status';
import { Entity } from './entity';
import { GroupWork } from './group-work';
import { TypeAudit } from './type-audit';

export class Audit {
  id: number;
  number: string;
  year: number;
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
  type = new TypeAudit();
  files: AuditFile[];
}
