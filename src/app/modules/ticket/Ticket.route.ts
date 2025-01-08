import express from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { TicketValidation } from "./Ticket.validation";
import { TicketController } from "./Ticket.controller";

const router = express.Router();

/** create ticket */
router.post(
  "/",
  auth(),
  validateRequest(TicketValidation.createTicketValidationSchema),
  TicketController.createTicket
);

/** update ticket by :id */
router.put(
  "/:id",
  auth(),
  validateRequest(TicketValidation.updateTicketValidationSchema),
  TicketController.updateTicket
);

/** delete ticket by :id */
router.delete("/:id", auth(), TicketController.deleteTicket);

export const TicketRoutes = router;
