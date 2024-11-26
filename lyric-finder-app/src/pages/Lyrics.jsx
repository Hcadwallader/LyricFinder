import { useLocation } from 'react-router';
import { calcuateOccuranceOfWord } from '../utilities';

export default function Lyrics() {
	const { state } = useLocation();
	const { lyrics } = state;
	return (
		<>
			<h1>Lyrics</h1>
			<label>
				Word to search:
				<input
					value={word}
					onChange={(e) => setWord(e.target.value)}
				/>
			</label>
			<p>{lyrics}</p>
		</>
	);
}
