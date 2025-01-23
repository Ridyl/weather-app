import { useEffect, useState } from 'react';
import { getQuote } from '../api/axios';
import PropTypes from 'prop-types';
import Clock from './Clock';

function DayCard({ weather }) {
	const [quote, setQuote] = useState(null);
	const [error, setError] = useState(null);

	const currTemp = weather?.current?.temperature_2m || 'Loading...';
	const precChance = weather.current.precipitation;
	const windSpeed = weather.current.wind_speed_10m;
	const windDir = weather.current.wind_direction_10m;

	useEffect(() => {
		const fetchQuote = async () => {
			try {
				const dailyQuote = await getQuote();
				setQuote(dailyQuote);
			} catch (err) {
				setError(err.message);
			}
		};

		fetchQuote();
	}, []);

	function SetFooter() {
		if (error) return <p className='text-secondary'>{error}</p>;
		if (!quote) return <p className='text-secondary'>Loading...</p>;
		if (quote) {
			return (
				<div className='card-footer'>
					<blockquote className='text-secondary'>
						&ldquo;{quote[0].q}&rdquo;
						<footer className='fst-italic'>-{quote[0].a}</footer>
					</blockquote>
				</div>
			);
		}
	}

	return (
		<div className='card daily'>
			<div className='card-header'>
				<Clock />
			</div>
			<div className='container dailycontainer'>
				<div className='card-body row'>
					<div className='card col top'>
						<div className='card-header'>Temperature</div>
						<div className='card-body'>
							<div className='card-text'>{currTemp}</div>
						</div>
					</div>
					<div className='card col top'>
						<div className='card-header'>Precipitation Chance</div>
						<div className='card-body'>
							<div className='card-text'>{precChance}%</div>
						</div>
					</div>
					<div className='card col top'>
						<div className='card-header'>Winds</div>
						<div className='card-body'>
							<div className='card-text'>
								{windSpeed}mph -- {windDir}
							</div>
						</div>
					</div>
					<div className='card map'>*MAP OBJECT</div>
				</div>
			</div>
			<SetFooter />
		</div>
	);
}

DayCard.propTypes = {
	weather: PropTypes.shape({
		current: PropTypes.shape({
			temperature_2m: PropTypes.number.isRequired, // Temperature in °F or °C
			apparent_temperature: PropTypes.number, // Feels-like temperature
			wind_speed_10m: PropTypes.number, // Wind speed in mph
			wind_direction_10m: PropTypes.number, // Wind direction in degrees
			precipitation: PropTypes.number, // Precipitation in inches or mm
			time: PropTypes.number.isRequired, // Unix time
		}),
		latitude: PropTypes.number, // Latitude of the location
		longitude: PropTypes.number, // Longitude of the location
		timezone: PropTypes.string, // Timezone of the location
		elevation: PropTypes.number, // Elevation in meters
	}),
};

export default DayCard;
