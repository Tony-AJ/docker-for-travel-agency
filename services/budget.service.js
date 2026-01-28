import prisma from "../config/db.js";

export const calculateBudget = async (userId, tripId) => {
  // Verify trip ownership
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId }
  });
  if (!trip) throw new Error("Trip not found");

  // Sum activity costs
  const activities = await prisma.tripActivity.findMany({
    where: {
      tripStop: {
        tripId
      }
    },
    include: {
      activity: true
    }
  });

  const activityCost = activities.reduce(
    (sum, a) => sum + a.activity.cost,
    0
  );

  const totalCost = activityCost;

  return prisma.tripBudget.upsert({
    where: { tripId },
    update: {
      activityCost,
      totalCost
    },
    create: {
      tripId,
      activityCost,
      totalCost
    }
  });
};

export const getBudget = async (userId, tripId) => {
  const budget = await prisma.tripBudget.findFirst({
    where: {
      tripId,
      trip: { userId }
    }
  });

  if (!budget) throw new Error("Budget not found");
  return budget;
};

export const updateBudget = async (userId, tripId, data) => {
  const existing = await prisma.tripBudget.findFirst({
    where: {
      tripId,
      trip: { userId }
    }
  });

  if (!existing) throw new Error("Budget not found");

  const totalCost =
    (data.stayCost ?? existing.stayCost) +
    (data.transportCost ?? existing.transportCost) +
    (data.activityCost ?? existing.activityCost) +
    (data.mealCost ?? existing.mealCost);

  return prisma.tripBudget.update({
    where: { tripId },
    data: {
      stayCost: data.stayCost ?? existing.stayCost,
      transportCost: data.transportCost ?? existing.transportCost,
      activityCost: data.activityCost ?? existing.activityCost,
      mealCost: data.mealCost ?? existing.mealCost,
      totalCost
    }
  });
};
