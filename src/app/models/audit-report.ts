import { Audit } from "./audit";

export class AuditReport {
  id: number;
  subject: string;
  body: string;

  createdAt: Date;
  updatedAt: Date;

  userCreatedId: number;
  userUpdatedId: number;

  audit = new Audit();
}
