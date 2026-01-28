import prisma from "../config/db.js";
import crypto from "crypto";

const generateCode = () => crypto.randomBytes(6).toString("hex");

export const generateShareLink = async (userId, tripId) => {
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId }
  });

  if (!trip) throw new Error("Trip not found");

  return prisma.trip.update({
    where: { id: tripId },
    data: {
      isPublic: true,
      shareCode: trip.shareCode ?? generateCode()
    }
  });
};

export const getPublicTrip = async (shareCode) => {
  const trip = await prisma.trip.findFirst({
    where: { shareCode, isPublic: true },
    include: {
      stops: {
        orderBy: { orderIndex: "asc" },
        include: {
          city: true,
          activities: {
            include: { activity: true }
          }
        }
      },
      budget: true
    }
  });

  if (!trip) throw new Error("Shared trip not found");
  return trip;
};

export const copyTrip = async (userId, shareCode) => {
  const original = await getPublicTrip(shareCode);

  return prisma.trip.create({
    data: {
      userId,
      name: `${original.name} (Copy)`,
      description: original.description,
      startDate: original.startDate,
      endDate: original.endDate,
      stops: {
        create: original.stops.map((stop) => ({
          cityId: stop.cityId,
          startDate: stop.startDate,
          endDate: stop.endDate,
          orderIndex: stop.orderIndex,
          activities: {
            create: stop.activities.map((a) => ({
              activityId: a.activityId,
              scheduledOn: a.scheduledOn
            }))
          }
        }))
      }
    }
  });
};
