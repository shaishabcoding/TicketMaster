import { model, Schema } from "mongoose";
import { TTicket } from "./Ticket.interface";

const ticketSchema = new Schema<TTicket>(
  {
    bus: { type: Schema.Types.ObjectId, ref: "Bus", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    price: { type: Number, required: true },
    seatNumber: { type: Number, required: true },
    timeSlot: { type: Date, required: true },
    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    },
  },
  { timestamps: true }
);

export const Ticket = model<TTicket>("Ticket", ticketSchema);
