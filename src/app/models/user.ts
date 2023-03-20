import { Group } from './group';
import { Person } from './person';

export class User {
  id: number;
  username: string;

  password: string;
  passwordConfirm: string;
  // userCodConfirm: string;

  createdAt: Date;
  updatedAt: Date;

  userCreatedId: number;
  userUpdatedId: number;

  person = new Person();
  group = new Group();
  authorities: string[];
}

export interface UserSession {
  id: number;
  userName: string;
  group: {
    name: string;
    slug: 'default' | 'auditor' | 'admin';
  };
  isFirst: boolean;
  person: {
    name: string;
    surname: string;
    email: string;
    entity: {
      name: string;
      initial: string;
    };
  };
}
