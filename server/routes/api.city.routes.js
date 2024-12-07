const router = require("express").Router();
const { getAllCityController } = require("../controllers/CityController");

router.get("/", getAllCityController);
module.exports = router;
