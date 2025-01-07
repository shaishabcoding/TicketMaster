import express from "express";
import { AuthRoutes } from "../modules/auth/Auth.route";
import { BusRoutes } from "../modules/bus/Bus.route";
import { auth } from "../middlewares/auth";
import { BusController } from "../modules/bus/Bus.controller";
import { TicketRoutes } from "../modules/ticket/Ticket.route";

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

export default router;
