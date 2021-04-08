import { Permission } from './permission';
import { User } from './user';

export class Group {
  id: number;
  name: string;
  slug: string;

  createdAt: Date;
  updatedAt: Date;

  userCreatedId: number;
  userUpdatedId: number;

  users: User[];
  permissions: Permission[];
}
