import { MapContainer, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';

function DrawMap({ lat, lon }) {
	return (
		<>
			{lat && lon ? (
				<MapContainer
					center={[lat, lon]}
					zoom={11}
					scrollWheelZoom={false}
					style={{ height: '20rem', borderRadius: '10px' }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
				</MapContainer>
			) : (
				<div className='sad'>Loading...</div>
			)}
		</>
	);
}

DrawMap.propTypes = {
	lat: PropTypes.number,
	lon: PropTypes.number,
};

export default DrawMap;
