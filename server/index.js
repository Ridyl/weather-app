import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 5000;
app.use(cors());

app.get('/api/today', async (req, res) => {
	try {
		const response = await axios.get('https://zenquotes.io/api/today/');
		res.json(response.data);
	} catch (error) {
		console.error('Error fetching quotes:', error.message);
		res.status(500).json({ error: 'Failed to fetch quotes' });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
