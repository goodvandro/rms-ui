import { Address } from "./address";

export class Person {
  id: number;
  name: string;
  surname: string;
  contact: string;
  bi: string;
  email: string;

  createdAt: Date;
  updatedAt: Date;

  userCreatedId: number;
  userUpdatedId: number;

  address = new Address();
}
