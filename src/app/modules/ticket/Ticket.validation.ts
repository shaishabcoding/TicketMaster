import { z } from "zod";
import { Bus } from "../bus/Bus.model";
import { Ticket } from "./Ticket.model";

export const createTicketValidationSchema = z.object({
  body: z.object({
    busId: z
      .string()
      .nonempty({ message: "Bus ID is required" })
      .refine(async (busId) => !busId || (await Bus.findById(busId)), {
        message: "Bus does not exist",
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
        message: "Bus does not exist",
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

export const purchaseTicketValidationSchema = z.object({
  body: z.object({
    ticketId: z
      .string()
      .nonempty({ message: "Ticket ID is required" })
      .refine(
        async (ticketId) => !ticketId || (await Ticket.findById(ticketId)),
        {
          message: "Ticket does not exist",
        }
      ),
  }),
});

export const TicketValidation = {
  createTicketValidationSchema,
  updateTicketValidationSchema,
  purchaseTicketValidationSchema,
};
