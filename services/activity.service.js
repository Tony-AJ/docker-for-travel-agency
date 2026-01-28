import prisma from "../config/db.js";

export const getActivitiesByCity = async (cityId) => {
  return prisma.activity.findMany({
    where: { cityId: Number(cityId) },
    orderBy: { cost: "asc" }
  });
};

export const searchActivities = async (filters) => {
  const { cityId, type, maxCost } = filters;

  return prisma.activity.findMany({
    where: {
      AND: [
        cityId ? { cityId: Number(cityId) } : {},
        type ? { type: { equals: type, mode: "insensitive" } } : {},
        maxCost ? { cost: { lte: Number(maxCost) } } : {}
      ]
    },
    orderBy: { cost: "asc" }
  });
};

export const getActivityById = async (activityId) => {
  const activity = await prisma.activity.findUnique({
    where: { id: Number(activityId) }
  });

  if (!activity) throw new Error("Activity not found");
  return activity;
};
