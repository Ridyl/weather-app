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

		// Same as daily card function, just accesses array values for rain chance
		function SetPrecChance({ value }) {
			let setImg = '';

			if (value < 20) {
				setImg = 'bi bi-brightness-high-fill';
			} else if (value >= 20 && value < 50) {
				setImg = 'bi bi-cloud-sun-fill';
			} else if (value >= 50 && value < 75) {
				setImg = 'bi bi-cloud-drizzle-fill';
			} else {
				setImg = 'bi bi-cloud-rain-heavy-fill';
			}

			return <h1 className={setImg}></h1>;
		}

		return (
			<div className='card col futurecards'>
				<div className='card-header'>{dayConvert[day]}</div>
				<div className='card-body'>
					<div className='card-text'>
						<p>
							{tempMin[value]}&deg; - {tempMax[value]}&deg;
						</p>
						<div>
							<div>
								<SetPrecChance value={precChance[value]} />
								{precChance[value]}%
							</div>
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
