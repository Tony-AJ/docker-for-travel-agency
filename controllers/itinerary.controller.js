import * as itineraryService from "../services/itinerary.service.js";

export const addStop = async (req, res) => {
  try {
    const stop = await itineraryService.addStop(
      req.userId,
      req.params.tripId,
      req.body
    );
    res.status(201).json({
      success: true,
      message: "City added to trip",
      data: stop
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getItinerary = async (req, res) => {
  try {
    const itinerary = await itineraryService.getItinerary(
      req.userId,
      req.params.tripId
    );
    res.json({
      success: true,
      data: itinerary
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const addActivity = async (req, res) => {
  try {
    const activity = await itineraryService.addActivity(
      req.userId,
      req.params.stopId,
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Activity added",
      data: activity
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const removeActivity = async (req, res) => {
  try {
    await itineraryService.removeActivity(
      req.userId,
      req.params.activityId
    );
    res.json({
      success: true,
      message: "Activity removed"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
