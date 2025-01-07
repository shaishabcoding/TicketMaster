import { model, Schema } from "mongoose";
import { TBus } from "./Bus.interface";

const busSchema = new Schema<TBus>(
  {
    name: { type: String, required: true, trim: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    capacity: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Bus = model<TBus>("Bus", busSchema);
