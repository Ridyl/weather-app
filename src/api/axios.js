import axios from 'axios';

const API_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5000/api' // Local backend
		: 'https://weather-app-ridyls-projects.vercel.app/api'; // Deployed backend

const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000,
});

export const getQuote = async () => {
	try {
		const response = await api.get('/today'); // Corrected path
		return response.data;
	} catch (error) {
		console.error('Error fetching quote data:', error);
		throw error;
	}
};

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
