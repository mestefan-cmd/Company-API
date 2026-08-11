const express = require('express');
const controller = require('../Controllers/weatherController');
const { errorContext } = require('../middleware/errorHandler');

const router = express.Router();

/**
 * @swagger
 * /weather/governorates:
 *   get:
 *     tags:
 *       - Weather
 *     summary: Get list of all Jordan governorates with their IDs (1 to 12)
 *     responses:
 *       '200':
 *         description: List of governorates
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: Amman
 *               - id: 2
 *                 name: Zarqa
 *               - id: 3
 *                 name: Irbid
 */
router.get('/governorates', errorContext({
    fallbackMessage: 'Unable to fetch governorates.'
}), controller.getGovernorates);

/**
 * @swagger
 * /weather/{id}:
 *   get:
 *     tags:
 *       - Weather
 *     summary: Get weather for a specific Jordan governorate by ID (1 to 12)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Governorate ID (1 to 12)
 *         example: 1
 *     responses:
 *       '200':
 *         description: Current weather for requested governorate
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               governorate: Amman
 *               country: JO
 *               temp: 28.5
 *               feels_like: 27.8
 *               humidity: 45
 *               condition: clear sky
 *               icon: https://openweathermap.org/img/wn/01d@2x.png
 *       '400':
 *         description: Invalid governorate ID
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid governorate ID. Must be an integer between 1 and 12.
 */
router.get('/:id', errorContext({
    fallbackMessage: 'An unexpected error occurred while fetching weather data.'
}), controller.getWeatherById);

module.exports = router;
