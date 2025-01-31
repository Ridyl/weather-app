import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
	process.env.FRONTEND_URL || 'http://localhost:3000', // Dev frontend
	'https://weather-app-ridyls-projects.vercel.app', // Deployed frontend
];

app.use(
	cors({
		origin: allowedOrigins,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	})
);

app.use(express.json());

app.get('/api/today', async (req, res) => {
	try {
		const response = await axios.get('https://zenquotes.io/api/today/');
		res.json(response.data);
	} catch (error) {
		console.error('Error fetching quotes:', error.message);
		res.status(500).json({ error: 'Failed to fetch quotes' });
	}
});

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
		console.error('Error fetching user info:', error.message);
		res.status(500).json({ error: 'Failed to fetch user info' });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
