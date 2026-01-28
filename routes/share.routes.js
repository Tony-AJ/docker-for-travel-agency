import express from "express";
import {
  shareTrip,
  viewPublicTrip,
  copyPublicTrip
} from "../controllers/share.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Generate link
router.post("/:tripId", auth, shareTrip);

// Public view
router.get("/public/:code", viewPublicTrip);

// Copy shared trip
router.post("/public/:code/copy", auth, copyPublicTrip);

export default router;
