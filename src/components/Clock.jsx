import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function Clock({ day }) {
	const [time, setTime] = useState(new Date());

	const dayConvert = {
		0: 'Sunday',
		1: 'Monday',
		2: 'Tuesday',
		3: 'Wednsday',
		4: 'Thursday',
		5: 'Friday',
		6: 'Saturday',
	};

	useEffect(() => {
		let timer = setInterval(() => setTime(new Date()), 1000);
		return function cleanup() {
			clearInterval(timer);
		};
	});

	return (
		<h5>
			{dayConvert[day]}: {time.toLocaleDateString()}
			<span className='float-end'>{time.toLocaleTimeString()}</span>
		</h5>
	);
}

Clock.propTypes = {
	day: PropTypes.number.isRequired,
};
