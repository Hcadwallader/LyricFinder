import { BrowserRouter, Route, Routes } from 'react-router';
import Selection from './pages/Selection';
import Lyrics from './pages/Lyrics';
import './App.css';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Selection />}></Route>
				<Route path="/selection" element={<Selection />}></Route>
				<Route path="/lyrics" element={<Lyrics />}></Route>
			</Routes>
		</BrowserRouter>
	);
}
