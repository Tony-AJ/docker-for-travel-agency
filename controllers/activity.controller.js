import * as activityService from "../services/activity.service.js";

export const getActivities = async (req, res) => {
  try {
    const activities = req.query.cityId || req.query.type || req.query.maxCost
      ? await activityService.searchActivities(req.query)
      : [];

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getActivitiesByCity = async (req, res) => {
  try {
    const activities = await activityService.getActivitiesByCity(
      req.params.cityId
    );
    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getActivity = async (req, res) => {
  try {
    const activity = await activityService.getActivityById(req.params.id);
    res.json({
      success: true,
      data: activity
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
