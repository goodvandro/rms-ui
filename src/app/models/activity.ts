import { TypeActivity } from './type-activity';
import { User } from './user';

export class Activity {
  id: number;
  description: string;

  user = new User();
  typeActivity = new TypeActivity();

  createdAt: Date;
  updatedAt: Date;
}
