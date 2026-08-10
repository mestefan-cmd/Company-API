const fetchWeather = async (city = 'Amman') => {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY || '2d8b3b54860ec7465a84839cbf785fc7';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            return {
                city,
                error: errorData.message || 'Unable to fetch weather data'
            };
        }

        const data = await response.json();
        return {
            city: data.name,
            country: data.sys?.country,
            temp: data.main?.temp,
            feels_like: data.main?.feels_like,
            humidity: data.main?.humidity,
            condition: data.weather?.[0]?.description,
            icon: data.weather?.[0]?.icon ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : null
        };
    } catch (err) {
        return {
            city,
            error: err.message || 'Failed to connect to weather service'
        };
    }
};

module.exports = { fetchWeather };
