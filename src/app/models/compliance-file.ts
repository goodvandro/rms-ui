export class ComplianceFile {
  id: number;
  name: string;
  description: string;
  originalName: string;

  createdAt: Date;
  updatedAt: Date;

  userCreatedId: number;
  userUpdatedId: number;
}
