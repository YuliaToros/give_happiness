const { City } = require("../db/models");

class CityService {
  static async getAllCity() {
    try {
      const cities = await City.findAll({
        order: [["id", "ASC"]],
      });

      return cities;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CityService;
