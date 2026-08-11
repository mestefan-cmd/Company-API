const { getGovernorates, fetchWeatherByGovernorateId } = require('../services/weatherService');

exports.getGovernorates = async (req, res) => {
    const governorates = getGovernorates();
    return res.status(200).json(governorates);
};

exports.getWeatherById = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const weather = await fetchWeatherByGovernorateId(id);

        if (!weather) {
            return res.status(502).json({
                error: 'Unable to fetch weather data at this time.'
            });
        }

        return res.status(200).json(weather);
    } catch (err) {
        if (err.code === 'INVALID_GOVERNORATE') {
            return res.status(400).json({
                error: 'Invalid governorate ID. Please provide an integer between 1 and 12.'
            });
        }
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};
