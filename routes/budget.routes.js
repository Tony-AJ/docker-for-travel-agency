import express from "express";
import {
  calculateTripBudget,
  getTripBudget,
  updateTripBudget
} from "../controllers/budget.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:tripId/calculate", auth, calculateTripBudget);
router.get("/:tripId", auth, getTripBudget);
router.put("/:tripId", auth, updateTripBudget);

export default router;
