import { User } from "./user";

export class GroupWork {
  id: number;
  name: string;

  createdAt: Date;
  updatedAt: Date;

  userCreatedId: number;
  userUpdatedId: number;

  users: User[];
}
