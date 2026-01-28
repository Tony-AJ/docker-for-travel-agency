import express from "express";
import {
  createTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip
} from "../controllers/trip.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", auth, createTrip);
router.get("/", auth, getTrips);
router.get("/:id", auth, getTrip);
router.put("/:id", auth, updateTrip);
router.delete("/:id", auth, deleteTrip);

export default router;
