import PropTypes from 'prop-types';

function WindArrow({ direction, speed }) {
	const arrow = {
		transform: `rotate(${direction}deg)`,
		transformOrigin: 'center',
	};

	return (
		<>
			<p className='pt-4'>N</p>
			<div className=''>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='32'
					height='32'
					fill='currentColor'
					className='bi bi-arrow-down'
					viewBox='0 0 16 16'
					style={{ display: 'inline-block', ...arrow }}
				>
					<path
						fillRule='evenodd'
						d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1'
					/>
				</svg>
			</div>
			<p className='card-text pt-4'>{speed} mph</p>
		</>
	);
}

WindArrow.propTypes = {
	direction: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	speed: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default WindArrow;
