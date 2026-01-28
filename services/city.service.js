import prisma from "../config/db.js";

export const getAllCities = async () => {
  return prisma.city.findMany({
    orderBy: { popularity: "desc" }
  });
};

export const searchCities = async (query, country) => {
  return prisma.city.findMany({
    where: {
      AND: [
        query
          ? { name: { contains: query, mode: "insensitive" } }
          : {},
        country
          ? { country: { equals: country, mode: "insensitive" } }
          : {}
      ]
    },
    orderBy: { popularity: "desc" }
  });
};

export const getCityById = async (cityId) => {
  const city = await prisma.city.findUnique({
    where: { id: Number(cityId) },
    include: {
      activities: true
    }
  });

  if (!city) throw new Error("City not found");
  return city;
};
// export const getCitiesByCountry = async (country) => {
//   return prisma.city.findMany({
//     where: {
//       country: { equals: country, mode: "insensitive" }
//     },
//     orderBy: { popularity: "desc" }
//   });
// };
// export const getPopularCities = async (limit = 10) => {
//   return prisma.city.findMany({
//     orderBy: { popularity: "desc" },
//     take: limit
//   });
// };
// export const getCitiesWithActivities = async () => {
//   return prisma.city.findMany({
//     where: {
//       activities: {
//         some: {}
//       }
//     },
//     orderBy: { popularity: "desc" }
//   });
// };
