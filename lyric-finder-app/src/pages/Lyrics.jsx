import { useLocation } from 'react-router';
import { calcuateOccuranceOfWord } from '../utilities';
import { useState } from 'react';

export default function Lyrics() {
	const [word, setWord] = useState('');
	const [count, setCount] = useState(null);
	const { state } = useLocation();
	const { lyrics } = state;

	const handleChangeWord = (e) => {
		setWord(e.target.value);
		let countOfWord = calcuateOccuranceOfWord(e.target.value, lyrics);
		setCount(countOfWord);
	};
	return (
		<>
			<h1>Lyrics</h1>
			<label className="item">
				Word to search:
				<input value={word} onChange={(e) => handleChangeWord(e)} />
			</label>

			{word && count && (
				<p className="item">
					Number of instance of {word}: {count}
				</p>
			)}
			<p className="item">{lyrics}</p>
		</>
	);
}
