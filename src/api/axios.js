import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:5000',
	timeout: 10000,
});

export const getQuote = async () => {
	try {
		const response = await api.get('/api/today');
		return response.data;
	} catch (error) {
		console.error('Error fetching quote data', error);
		throw error;
	}
};

export const getWeather = async (lat, lon) => {
	if (!lat || !lon) {
		throw new Error('Latitude and Longitude are required to fetch weather.');
	}

	try {
		const weather = await api.get('/api/weather', { params: { lat, lon } });
		return weather.data;
	} catch (error) {
		console.error('Error fetching weather data', error);
		throw error;
	}
};
