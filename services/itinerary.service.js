import prisma from "../config/db.js";

export const addStop = async (userId, tripId, data) => {
  // verify trip belongs to user
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId }
  });
  if (!trip) throw new Error("Trip not found");

  return prisma.tripStop.create({
    data: {
      tripId,
      cityId: data.cityId,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      orderIndex: data.orderIndex
    }
  });
};

export const getItinerary = async (userId, tripId) => {
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    include: {
      stops: {
        orderBy: { orderIndex: "asc" },
        include: {
          city: true,
          activities: {
            include: { activity: true }
          }
        }
      }
    }
  });

  if (!trip) throw new Error("Trip not found");
  return trip;
};

export const addActivity = async (userId, stopId, data) => {
  const stop = await prisma.tripStop.findFirst({
    where: {
      id: stopId,
      trip: { userId }
    }
  });

  if (!stop) throw new Error("Trip stop not found");

  return prisma.tripActivity.create({
    data: {
      tripStopId: stopId,
      activityId: data.activityId,
      scheduledOn: new Date(data.scheduledOn)
    }
  });
};

export const removeActivity = async (userId, activityId) => {
  const activity = await prisma.tripActivity.findFirst({
    where: {
      id: activityId,
      tripStop: {
        trip: { userId }
      }
    }
  });

  if (!activity) throw new Error("Activity not found");

  return prisma.tripActivity.delete({
    where: { id: activityId }
  });
};
