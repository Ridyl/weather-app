import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow CORS for frontend
const allowedOrigins = [
	process.env.FRONTEND_URL || 'http://localhost:3000',
	'https://weather-app-delta-livid-35.vercel.app/',
];

app.use(
	cors({
		origin: allowedOrigins,
		methods: ['GET', 'POST'],
		credentials: true,
	})
);

app.use(express.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
	next();
});

// API: Get Quote
app.get('/api/today', async (req, res) => {
	try {
		const response = await axios.get('https://zenquotes.io/api/today/');
		res.json(response.data);
	} catch (error) {
		console.error('Error fetching quotes:', error.message);
		res.status(500).json({ error: 'Failed to fetch quotes' });
	}
});

// API: Get Weather
app.get('/api/weather', async (req, res) => {
	const { lat, lon } = req.query;

	if (!lat || !lon) {
		return res
			.status(400)
			.json({ error: 'Latitude and longitude are required.' });
	}

	try {
		const response = await axios.get(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,precipitation,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=auto`
		);
		res.json(response.data);
	} catch (error) {
		console.error('Error fetching weather info:', error.message);
		res.status(500).json({ error: 'Failed to fetch weather info' });
	}
});

// Export app for Vercel serverless functions
export default app;
