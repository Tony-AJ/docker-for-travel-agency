import * as cityService from "../services/city.service.js";

export const getCities = async (req, res) => {
  try {
    const { search, country } = req.query;

    const cities = search || country
      ? await cityService.searchCities(search, country)
      : await cityService.getAllCities();

    res.json({
      success: true,
      data: cities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getCity = async (req, res) => {
  try {
    const city = await cityService.getCityById(req.params.id);
    res.json({
      success: true,
      data: city
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
// export const getCitiesByCountry = async (req, res) => {
//   try {
//     const cities = await cityService.getCitiesByCountry(req.params.country);
//     res.json({
//       success: true,
//       data: cities
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// export const getPopularCities = async (req, res) => {
//   try {
//     const limit = req.query.limit ? parseInt(req.query.limit) : 10;
//     const cities = await cityService.getPopularCities(limit);
//     res.json({
//       success: true,
//       data: cities
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// export const getCitiesWithActivities = async (req, res) => {
//   try {
//     const cities = await cityService.getCitiesWithActivities();
//     res.json({
//       success: true,
//       data: cities
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
