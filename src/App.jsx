import { useEffect, useState } from 'react';
import Header from './components/Header';
import DayCard from './components/DailyCard';
import Future from './components/FutureCards';
import { getWeather } from './api/axios';
import './App.css';

function App() {
	const [weather, setWeather] = useState({});

	useEffect(() => {
		function getWeatherData() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(async (position) => {
					const lat = position.coords.latitude;
					const lon = position.coords.longitude;

					try {
						const weatherReq = await getWeather(lat, lon);
						setWeather(weatherReq);
					} catch (err) {
						console.error(err);
					}
				});
			} else {
				console.log('Geo is not supported');
			}
		}

		getWeatherData();
	}, []);

	return (
		<>
			<Header />
			<DayCard weather={weather} />
			<Future />
		</>
	);
}

export default App;
