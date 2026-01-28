import express from "express";
import {
  getActivities,
  getActivitiesByCity,
  getActivity
} from "../controllers/activity.controller.js";

const router = express.Router();

// Search & filter
router.get("/", getActivities);

// List by city
router.get("/city/:cityId", getActivitiesByCity);

// Single activity
router.get("/:id", getActivity);

export default router;
