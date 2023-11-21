import { Owner } from "./Owner";

export type Car = {
  id: number;
  plate: string;
  model: string;
  color: string;
  brand: string;
  owner: Owner;
};
