const GOVERNORATES = [
    { id: 1,  name: 'Amman' },
    { id: 2,  name: 'Zarqa' },
    { id: 3,  name: 'Irbid' },
    { id: 4,  name: 'Aqaba' },
    { id: 5,  name: 'Mafraq' },
    { id: 6,  name: 'Jerash' },
    { id: 7,  name: 'Ajloun' },
    { id: 8,  name: 'Madaba' },
    { id: 9,  name: 'Balqa' },
    { id: 10, name: 'Karak' },
    { id: 11, name: 'Tafilah' },
    { id: 12, name: "Ma'an" }
];

const getGovernorates = () => {
    return GOVERNORATES;
};

const getGovernorateById = (id) => {
    const numericId = Number(id);
    return GOVERNORATES.find(gov => gov.id === numericId) || null;
};

const fetchWeatherByGovernorateId = async (id) => {
    const governorate = getGovernorateById(id);
    if (!governorate) {
        const err = new Error(`Invalid governorate ID: ${id}`);
        err.code = 'INVALID_GOVERNORATE';
        throw err;
    }

    try {
        const baseUrl = process.env.OPENWEATHER_BASE_URL;
        const apiKey  = process.env.OPENWEATHER_API_KEY;
        const url     = `${baseUrl}?q=${encodeURIComponent(governorate.name)}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        if (!response.ok) {
            console.error(`OpenWeather API error: ${response.status} for ${governorate.name}`);
            return null;
        }

        const data = await response.json();

        return {
            id: governorate.id,
            governorate: governorate.name,
            country: data.sys?.country,
            temp: data.main?.temp,
            feels_like: data.main?.feels_like,
            humidity: data.main?.humidity,
        };
    } catch (err) {
        console.error(`Failed to fetch weather for ${governorate.name}:`, err.message);
        return null;
    }
};

module.exports = {
    getGovernorates,
    getGovernorateById,
    fetchWeatherByGovernorateId
};
