import { z } from "zod";

const busCreateValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().nonempty("Name is required."),
    source: z.string().nonempty("Source is required."),
    destination: z.string().nonempty("Destination is required."),
    departureTime: z.string().refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      {
        message: "Invalid date format",
      }
    ),
    arrivalTime: z.string().refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      {
        message: "Invalid date format",
      }
    ),
    capacity: z
      .number()
      .int("Capacity must be an integer.")
      .positive("Capacity must be a positive number."),
  }),
});

const busUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().nonempty("Name is required.").optional(),
    source: z.string().nonempty("Source is required.").optional(),
    destination: z.string().nonempty("Destination is required.").optional(),
    departureTime: z
      .string()
      .refine(
        (val) => {
          const date = new Date(val);
          return !isNaN(date.getTime());
        },
        {
          message: "Invalid date format",
        }
      )
      .optional(),
    arrivalTime: z
      .string()
      .refine(
        (val) => {
          const date = new Date(val);
          return !isNaN(date.getTime());
        },
        {
          message: "Invalid date format",
        }
      )
      .optional(),
    capacity: z
      .number()
      .int("Capacity must be an integer.")
      .positive("Capacity must be a positive number.")
      .optional(),
  }),
});

export const BusValidation = {
  busCreateValidationSchema,
  busUpdateValidationSchema,
};
