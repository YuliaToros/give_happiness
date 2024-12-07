const CityService = require("../services/city.service");

exports.getAllCityController = async (req, res) => {
  try {
    const city = await CityService.getAllCity();
    res.status(200).json({ message: "success", city });
  } catch (error) {
    res.status(500).json({ message: error.message, city: [] });
  }
};