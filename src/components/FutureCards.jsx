import PropTypes from 'prop-types';

function Future({ weather, day }) {
	const tempMin = weather?.daily?.temperature_2m_min || 'Loading...';
	const tempMax = weather?.daily?.temperature_2m_max || 'Loading...';
	const precChance =
		weather?.daily?.precipitation_probability_max || 'Loading...';

	function FutureForecast({ value, day }) {
		day = day + value;

		if (day > 6) {
			day = day - 7;
		}

		const dayConvert = {
			0: 'Sunday',
			1: 'Monday',
			2: 'Tuesday',
			3: 'Wednsday',
			4: 'Thursday',
			5: 'Friday',
			6: 'Saturday',
		};

		return (
			<div className='card col futurecards'>
				<div className='card-header'>{dayConvert[day]}</div>
				<div className='card-body'>
					<div className='card-text'>
						<p>
							{tempMin[value]}&deg; - {tempMax[value]}&deg;
						</p>
						<div>
							<i className='bi bi-cloud-drizzle-fill'></i>
							<p>{precChance[value]}%</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='container row' id='future'>
			<FutureForecast value={0} day={day} />
			<FutureForecast value={1} day={day} />
			<FutureForecast value={2} day={day} />
			<FutureForecast value={3} day={day} />
			<FutureForecast value={4} day={day} />
			<FutureForecast value={5} day={day} />
			<FutureForecast value={6} day={day} />
		</div>
	);
}

Future.propTypes = {
	weather: PropTypes.shape({
		daily: PropTypes.shape({
			time: PropTypes.arrayOf(PropTypes.number),
			temperature_2m_max: PropTypes.arrayOf(PropTypes.number),
			temperature_2m_min: PropTypes.arrayOf(PropTypes.number),
			precipitation_probability_max: PropTypes.arrayOf(PropTypes.number),
		}),
	}),
	value: PropTypes.number,
	day: PropTypes.number.isRequired,
};

export default Future;
