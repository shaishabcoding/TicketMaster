import express from "express";
import { AuthRoutes } from "../modules/auth/Auth.route";
import { BusRoutes } from "../modules/bus/Bus.route";
import { auth } from "../middlewares/auth";
import { BusController } from "../modules/bus/Bus.controller";
import { TicketRoutes } from "../modules/ticket/Ticket.route";
import { TicketController } from "../modules/ticket/Ticket.controller";
import validateRequest from "../middlewares/validateRequest";
import { TicketValidation } from "../modules/ticket/Ticket.validation";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/admin/bus",
    route: BusRoutes,
  },
  {
    path: "/admin/ticket",
    route: TicketRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

router.get("/buses", auth(["USER"]), BusController.getAllBuses);

router.post(
  "/tickets/purchase",
  auth(["USER"]),
  validateRequest(TicketValidation.purchaseTicketValidationSchema),
  TicketController.purchaseTicket
);

export default router;
