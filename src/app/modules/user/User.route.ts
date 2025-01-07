import express from "express";
import { UserControllers } from "./User.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth(["ADMIN"]), UserControllers.getAllUser);
router.get("/:email", auth(["ADMIN"]), UserControllers.getSingleUser);

export const UserRoutes = router;
