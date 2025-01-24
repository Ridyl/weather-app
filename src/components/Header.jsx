import PropTypes from 'prop-types';

function Header({ handleDarkMode }) {
	return (
		<div className='container text-center header'>
			<div className='container'>
				<input
					type='checkbox'
					className='checkbox'
					id='checkbox'
					onChange={handleDarkMode}
				/>
				<label htmlFor='checkbox' className='checkbox-label'>
					<i className='bi bi-brightness-high-fill'></i>
					<i className='bi bi-moon-fill'></i>
					<span className='ball'></span>
				</label>
				<h2 className='title'>WeatherTopia</h2>
				<p className='text-secondary'>
					You Personalized Portal to Perfect Forecasts!
				</p>
			</div>
		</div>
	);
}

Header.propTypes = {
	handleDarkMode: PropTypes.func.isRequired,
};

export default Header;
