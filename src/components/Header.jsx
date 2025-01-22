function Header() {
	return (
		<div className='container text-center header'>
			<h2 className='title'>WeatherTopia</h2>
			<p className='text-secondary'>
				You Personalized Portal to Perfect Forecasts!
			</p>
			<div className='form-floating searchbar'>
				<input
					type='text'
					className='form-control'
					id='locationSearch'
					placeholder='Location'
				/>
				<label htmlFor='locationSearch'>Location:</label>
			</div>
		</div>
	);
}

export default Header;
