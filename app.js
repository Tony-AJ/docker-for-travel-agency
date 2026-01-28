import express from "express";
import authRoutes from "./routes/auth.routes.js";
import tripRoutes from "./routes/trip.routes.js";
import itineraryRoutes from "./routes/itinerary.routes.js";
import cityRoutes from "./routes/city.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import bugetRoutes  from "./routes/budget.routes.js";
import shareRoutes from "./routes/share.routes.js";

const app = express();

app.use(express.json());

// Normalize URLs to prevent "Cannot POST //path" errors
app.use((req, res, next) => {
  req.url = req.url.replace(/\/+/g, "/");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/budgets", bugetRoutes);
app.use("/api/share", shareRoutes);

export default app;
