import { EntityLevel } from './entity-level';
// import { Address } from "./address";

export class Entity {
  id: number;
  name: string;
  initial: string;
  auditor: boolean = false;

  city: string;
  district: string;
  street: string;

  createdAt: Date;
  updatedAt: Date;

  userCreatedId: number;
  userUpdatedId: number;

  // address = new Address();
  level = new EntityLevel();
}
