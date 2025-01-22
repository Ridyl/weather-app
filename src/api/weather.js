import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:5000',
	timeout: 10000,
});

export const getData = async () => {
	try {
		const response = await api.get('/api/today');
		return response.data;
	} catch (error) {
		console.error('Error fetching quote data', error);
		throw error;
	}
};
