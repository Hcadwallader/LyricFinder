import { useEffect, useState } from 'react';
import { getArtistId } from '../services/musicService';
import { useNavigate } from 'react-router-dom';

export default function Selection() {
	const navigate = useNavigate();

	const [artistList, setArtistList] = useState([
		{ id: '47izDDvtOxxz3FzHYuUptd', name: 'Mcfly' },
		{ id: '0gusqTJKxtU1UTmNRMHZcv', name: 'Dizzee Rascal' },
		{ id: '3nFkdlSjzX9mRTtwJOzDYB', name: 'JAY-Z' },
	]);
	const [artist, setArtist] = useState('Please select artist');

	// const lookupArtistIds = async () => {
	// 	for (let a of artists) {
	// 		console.log(artists);
	// 		console.log('A ' + a);
	// 		let id = await getArtistId(a);
	// 		console.log(await id);

	// 		artistList.push({
	// 			id: id,
	// 			name: a,
	// 		});
	// 	}
	// };

	// useEffect(() => {
	// 	lookupArtistIds();
	// }, []);

	const handleSubmit = (e, artist, song) => {
		console.log(e, artist, song);
		navigate('/lyrics');
	};

	const handleArtist = (e) => {
		console.log(e);
	};

	return (
		<div className="App container">
			<h1>Lyric lookup</h1>
			<select
				className="item"
				name="artist"
				value={artist}
				onChange={handleArtist}
			>
				{artistList.map((artist, index) => {
					<option
						key={index}
						value={artist.name}
						onSelect={() => handleArtist(artist, i)}
					>
						{artist.name}
					</option>;
				})}
			</select>
			<button className="item" onClick={(e) => handleSubmit(e)}>
				Submit
			</button>
		</div>
	);
}
