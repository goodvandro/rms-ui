import { AuditStatusHistoryType } from './audit-status-history-type';
import { Audit } from './audit';

export class AuditStatusHistory {
  id: number;
  date: Date;

  audit = new Audit();
  auditStatusHistoryType = new AuditStatusHistoryType();
}
