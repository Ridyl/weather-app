import { useEffect, useState } from 'react';
import { getQuote } from '../api/axios';
import { Chart } from 'react-google-charts';
import PropTypes from 'prop-types';
import Clock from './Clock';
import WindArrow from './WindArrow';
import DrawMap from './Map';

const options = {
	width: 160,
	height: 160,
	redFrom: 90,
	redTo: 100,
	yellowFrom: 80,
	yellowTo: 90,
	greenFrom: 60,
	greenTo: 80,
	minorTicks: 5,
};

function DayCard({ weather, day }) {
	const [quote, setQuote] = useState(null);
	const [error, setError] = useState(null);

	const currTemp = weather?.current?.temperature_2m || 'Loading...';
	const precChance = weather?.current?.precipitation;
	const windSpeed = weather?.current?.wind_speed_10m || 'Loading...';
	const windDir = weather?.current?.wind_direction_10m || 'Loading...';
	const lat = weather?.latitude || 0;
	const lon = weather?.longitude || 0;

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
				<Clock day={day} />
			</div>
			<div className='container dailycontainer'>
				<div className='card-body row'>
					<div className='card col top temp'>
						<div className='card-header'>Temperature</div>
						<Chart
							chartType='Gauge'
							width='100%'
							height='100%'
							data={[
								['Label', 'Value'],
								['Temp', currTemp],
							]}
							options={options}
							className='temp'
						/>
					</div>
					<div className='card col top'>
						<div className='card-header'>Precipitation Chance</div>
						<div className='card-body'>
							<div className='card-text'>{precChance}%</div>
						</div>
					</div>
					<div className='card col top'>
						<div className='card-header'>Winds</div>
						<div className='card-body text-center' id='wind'>
							<WindArrow direction={windDir} speed={windSpeed} />
						</div>
					</div>
					<div className='card map-area'>
						<DrawMap lat={lat} lon={lon} />
					</div>
				</div>
			</div>
			<SetFooter />
		</div>
	);
}

DayCard.propTypes = {
	weather: PropTypes.shape({
		current: PropTypes.shape({
			temperature_2m: PropTypes.number.isRequired,
			apparent_temperature: PropTypes.number,
			wind_speed_10m: PropTypes.number,
			wind_direction_10m: PropTypes.number,
			precipitation: PropTypes.number,
			time: PropTypes.number.isRequired,
		}),
		latitude: PropTypes.number,
		longitude: PropTypes.number,
		timezone: PropTypes.string,
		elevation: PropTypes.number,
	}),
	day: PropTypes.number.isRequired,
};

export default DayCard;
