import { useEffect, useState } from 'react';
import { getData } from '../api/quotes';
import Clock from './Clock';

function DayCard() {
	const [quote, setQuote] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchQuote = async () => {
			try {
				const result = await getData();
				setQuote(result);
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
							<div className='card-text'>INFORMATION</div>
						</div>
					</div>
					<div className='card col top'>
						<div className='card-header'>Precipitation Chance</div>
						<div className='card-body'>
							<div className='card-text'>INFORMATION</div>
						</div>
					</div>
					<div className='card col top'>
						<div className='card-header'>Winds</div>
						<div className='card-body'>
							<div className='card-text'>INFORMATION</div>
						</div>
					</div>
					<div className='card map'>*MAP OBJECT</div>
				</div>
			</div>
			<SetFooter />
		</div>
	);
}

export default DayCard;
