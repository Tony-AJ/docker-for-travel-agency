import express from "express";
import {
  getCities,
  getCity
} from "../controllers/city.controller.js";

const router = express.Router();

router.get("/", getCities);
router.get("/:id", getCity);
// router.get("/country/:country", getCitiesByCountry );
// router.get("/popular/list", getPopularCities);
// router.get("/activities/popular", getCitiesWithPopularActivities);

export default router;
