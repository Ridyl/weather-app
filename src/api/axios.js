import axios from 'axios';

const API_URL =
	import.meta.env.MODE === 'development'
		? 'http://localhost:5000/api'
		: 'https://weather-app-delta-livid-35.vercel.app/api';

const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000,
});

// Fetch Quote
export const getQuote = async () => {
	try {
		const response = await api.get('/today');
		return response.data;
	} catch (error) {
		console.error('Error fetching quote data:', error);
		throw error;
	}
};

// Fetch Weather
export const getWeather = async (lat, lon) => {
	if (!lat || !lon) {
		throw new Error('Latitude and Longitude are required to fetch weather.');
	}

	try {
		const weather = await api.get('/weather', { params: { lat, lon } });
		return weather.data;
	} catch (error) {
		console.error('Error fetching weather data:', error);
		throw error;
	}
};
