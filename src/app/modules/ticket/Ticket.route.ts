import express from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { TicketValidation } from "./Ticket.validation";
import { TicketController } from "./Ticket.controller";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(TicketValidation.createTicketValidationSchema),
  TicketController.createTicket
);

export const TicketRoutes = router;
