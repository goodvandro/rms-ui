import { Audit } from "./audit";

export class Report {
  id: number;
  subject: string;
  body: string;

  createdAt: Date;
  updatedAt: Date;

  userCreatedId: number;
  userUpdatedId: number;

  audit = new Audit();
}
