import * as budgetService from "../services/budget.service.js";

export const calculateTripBudget = async (req, res) => {
  try {
    const budget = await budgetService.calculateBudget(
      req.userId,
      req.params.tripId
    );
    res.json({
      success: true,
      message: "Budget calculated",
      data: budget
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getTripBudget = async (req, res) => {
  try {
    const budget = await budgetService.getBudget(
      req.userId,
      req.params.tripId
    );
    res.json({
      success: true,
      data: budget
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const updateTripBudget = async (req, res) => {
  try {
    const budget = await budgetService.updateBudget(
      req.userId,
      req.params.tripId,
      req.body
    );
    res.json({
      success: true,
      message: "Budget updated",
      data: budget
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
