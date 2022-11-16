import { ActivityType } from './activity-type';
import { User } from './user';

export class Activity {
  id: number;
  description: string;

  registeID?: number;
  registeName?: string;

  user = new User();
  typeActivity = new ActivityType();

  createdAt: Date;
  updatedAt: Date;
}
