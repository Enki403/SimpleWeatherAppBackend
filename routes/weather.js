/* route: /api/weather */

const { Router } = require("express");

const { getWeatherByCityName, getWeatherByCoordinates } = require("../controllers/weather");

const router = Router();

router.get("/getWeatherByCityName", getWeatherByCityName);
router.get("/getWeatherByCoordinates", getWeatherByCoordinates);

module.exports = router;