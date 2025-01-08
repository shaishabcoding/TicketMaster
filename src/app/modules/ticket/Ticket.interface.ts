import { Types } from "mongoose";

export type TTicket = {
  bus: Types.ObjectId;
  user: Types.ObjectId;
  price: number;
  seatNumber: number;
  timeSlot: Date;
  status: "available" | "booked";
};
