import * as shareService from "../services/share.service.js";

export const shareTrip = async (req, res) => {
  try {
    const trip = await shareService.generateShareLink(
      req.userId,
      req.params.tripId
    );
    res.json({
      success: true,
      message: "Share link generated",
      data: trip
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const viewPublicTrip = async (req, res) => {
  try {
    const trip = await shareService.getPublicTrip(req.params.code);
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

export const copyPublicTrip = async (req, res) => {
  try {
    const trip = await shareService.copyTrip(
      req.userId,
      req.params.code
    );
    res.status(201).json({
      success: true,
      message: "Trip copied successfully",
      data: trip
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
