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

	// Could create a call within the API that would give current weather conditions but it increases
	// API call size and I wanted to keep it to a minimum for this small project
	function SetPrecChance() {
		let setImg = '';

		if (precChance < 20) {
			setImg = 'bi bi-brightness-high-fill';
		} else if (precChance >= 20 && precChance < 50) {
			setImg = 'bi bi-cloud-sun-fill';
		} else if (precChance >= 50 && precChance < 75) {
			setImg = 'bi bi-cloud-drizzle-fill';
		} else {
			setImg = 'bi bi-cloud-rain-heavy-fill';
		}

		return <h1 className={setImg}></h1>;
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
						<div className='card-body d-flex justify-content-center' id='gauge'>
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
					</div>
					<div className='card col top'>
						<div className='card-header'>Precipitation Chance</div>
						<div className='card-body'>
							<SetPrecChance />
							<h2 className='card-text'>{precChance}%</h2>
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
