import express from "express";
import {
  addStop,
  getItinerary,
  addActivity,
  removeActivity
} from "../controllers/itinerary.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Stops
router.post("/:tripId/stops", auth, addStop);
router.get("/:tripId", auth, getItinerary);

// Activities
router.post("/stops/:stopId/activities", auth, addActivity);
router.delete("/activities/:activityId", auth, removeActivity);

export default router;
