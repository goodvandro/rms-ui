export class AuditFile {
  id: number;
  name: string;
  originalName: string;

  createdAt: Date;
  updatedAt: Date;

  userCreatedId: number;
  userUpdatedId: number;
}
