import * as tripService from "../services/trip.service.js";

export const createTrip = async (req, res) => {
  try {
    const trip = await tripService.createTrip(req.userId, req.body);
    res.status(201).json({
      success: true,
      message: "Trip created successfully",
      data: trip
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getTrips = async (req, res) => {
  try {
    const trips = await tripService.getAllTrips(req.userId);
    res.json({
      success: true,
      data: trips
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getTrip = async (req, res) => {
  try {
    const trip = await tripService.getTripById(
      req.userId,
      req.params.id
    );
    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const trip = await tripService.updateTrip(
      req.userId,
      req.params.id,
      req.body
    );
    res.json({
      success: true,
      message: "Trip updated successfully",
      data: trip
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    await tripService.deleteTrip(req.userId, req.params.id);
    res.json({
      success: true,
      message: "Trip deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
