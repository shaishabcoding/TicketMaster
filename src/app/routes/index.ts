import express from "express";
import { AuthRoutes } from "../modules/auth/Auth.route";
import { BusRoutes } from "../modules/bus/Bus.route";

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
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
