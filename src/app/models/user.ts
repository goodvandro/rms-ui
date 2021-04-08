import { Group } from './group';
import { Person } from './person';

export class User {
  id: number;
  username: string;

  password: string;
  passwordConfirm: string;

  createdAt: Date;
  updatedAt: Date;

  userCreatedId: number;
  userUpdatedId: number;

  person = new Person();
  groups: Group[];
}
