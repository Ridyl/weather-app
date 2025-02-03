import { useEffect, useState } from 'react';
import Header from './components/Header';
import DayCard from './components/DailyCard';
import Future from './components/FutureCards';
import { getWeather } from './api/axios';
import './App.css';

function App() {
	const [weather, setWeather] = useState({});
	const [darkMode, setDarkMode] = useState(false);

	let date = new Date();
	const day = date.getDay();

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

	const handleDarkMode = () => {
		setDarkMode(!darkMode);
		const htmlElement = document.getElementById('htmlPage');
		htmlElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
	};

	return (
		<>
			<Header handleDarkMode={handleDarkMode} />
			<DayCard weather={weather} day={day} />
			<Future weather={weather} day={day} />
		</>
	);
}

export default App;
