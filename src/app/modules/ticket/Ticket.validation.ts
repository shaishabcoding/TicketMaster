import { z } from "zod";
import { Bus } from "../bus/Bus.model";

export const createTicketValidationSchema = z.object({
  body: z.object({
    busId: z
      .string()
      .nonempty({ message: "Bus ID is required" })
      .refine(async (busId) => !busId || (await Bus.findById(busId)), {
        message: "Bus ID does not exist",
      }),
    price: z.number().positive({ message: "Price must be a positive number" }),
    seatNumber: z
      .number()
      .positive({ message: "Seat number must be a positive number" }),
    timeSlot: z.string().refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      {
        message: "Invalid date format",
      }
    ),
  }),
});

export const updateTicketValidationSchema = z.object({
  body: z.object({
    busId: z
      .string()
      .optional()
      .refine(async (busId) => !busId || (await Bus.findById(busId)), {
        message: "Bus ID does not exist",
      }),
    price: z
      .number()
      .positive({ message: "Price must be a positive number" })
      .optional(),
    seatNumber: z
      .number()
      .positive({ message: "Seat number must be a positive number" })
      .optional(),
    timeSlot: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          const date = new Date(val);
          return !isNaN(date.getTime());
        },
        {
          message: "Invalid date format",
        }
      ),
  }),
});

export const TicketValidation = {
  createTicketValidationSchema,
  updateTicketValidationSchema,
};
