// import { Address } from "./address";
import { Entity } from './entity';

export class Person {
  id: number;
  name: string;
  surname: string;
  contact: string;
  bi: string;
  email: string;

  city: string = 'São Tomé';
  district: string = 'Água Grande';
  street: string;

  createdAt: Date;
  updatedAt: Date;

  userCreatedId: number;
  userUpdatedId: number;

  // address = new Address();
  entity = new Entity();
}
