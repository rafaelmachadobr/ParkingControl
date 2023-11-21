import { Car } from "./Car";
import { ParkingSpot } from "./ParkingSpot";

export type Permanence = {
  id: number;
  entryTime: Date;
  exitTime: Date | null;
  totalValue: number | null;
  car: Car;
  parkingSpot: ParkingSpot;
};
