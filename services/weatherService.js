const https = require('https');

const fetchWeather = (city = 'Amman') => {
    return new Promise((resolve) => {
        const apiKey = process.env.OPENWEATHER_API_KEY || 'REDACTED_API_KEY';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        const options = {
            rejectUnauthorized: false
        };

        https.get(url, options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    if (res.statusCode !== 200) {
                        return resolve({
                            city,
                            error: data.message || 'Unable to fetch weather data'
                        });
                    }

                    resolve({
                        city: data.name,
                        country: data.sys?.country,
                        temp: data.main?.temp,
                        feels_like: data.main?.feels_like,
                        humidity: data.main?.humidity,
                        condition: data.weather?.[0]?.description,
                        icon: data.weather?.[0]?.icon ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : null
                    });
                } catch (err) {
                    resolve({ city, error: 'Invalid response from weather provider' });
                }
            });
        }).on('error', (err) => {
            resolve({ city, error: err.message || 'Failed to connect to weather service' });
        });
    });
};

module.exports = { fetchWeather };
