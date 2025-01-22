import Header from './components/Header';
import DayCard from './components/DailyCard';
import Future from './components/FutureCards';
import './App.css';

function App() {
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			console.log('Geo is not supported');
		}
	}

	function showPosition(position) {
		console.log(position.coords.latitude);
		console.log(position.coords.longitude);
	}

	getLocation();

	return (
		<>
			<Header />
			<DayCard />
			<Future />
		</>
	);
}

export default App;
