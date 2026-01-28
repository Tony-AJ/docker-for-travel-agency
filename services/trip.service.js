import prisma from "../config/db.js";

export const createTrip = async (userId, data) => {
  return prisma.trip.create({
    data: {
      name: data.name,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      userId
    }
  });
};

export const getAllTrips = async (userId) => {
  return prisma.trip.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
};

export const getTripById = async (userId, tripId) => {
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId }
  });

  if (!trip) throw new Error("Trip not found");
  return trip;
};

export const updateTrip = async (userId, tripId, data) => {
  await getTripById(userId, tripId);

  return prisma.trip.update({
    where: { id: tripId },
    data: {
      name: data.name,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate)
    }
  });
};

export const deleteTrip = async (userId, tripId) => {
  await getTripById(userId, tripId);

  return prisma.trip.delete({
    where: { id: tripId }
  });
};
