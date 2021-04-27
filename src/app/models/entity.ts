import { EntityLevel } from './entity-level';
import { Address } from "./address";

export class Entity {
  id: number;
  name: string;
  initial: string;
  auditor: boolean = false;

  createdAt: Date;
  updatedAt: Date;

  userCreatedId: number;
  userUpdatedId: number;

  address = new Address();
  level = new EntityLevel();
}
