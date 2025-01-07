import express from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BusValidation } from "./Bus.validation";
import { BusController } from "./Bus.controller";

const router = express.Router();

/** create new bus */
router.post(
  "/",
  auth(),
  validateRequest(BusValidation.busCreateValidationSchema),
  BusController.createBus
);

/** update bus by :id */
router.put(
  "/:id",
  auth(),
  validateRequest(BusValidation.busUpdateValidationSchema),
  BusController.updateBus
);

/** delete bus by :id */
router.delete("/:id", auth());

export const BusRoutes = router;
