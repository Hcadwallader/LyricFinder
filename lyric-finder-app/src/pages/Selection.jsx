import {useEffect, useState} from 'react';
import {
    getArtistId,
    getArtistSongs,
    getLyrics,
} from '../services/musicService';
import {useNavigate} from 'react-router-dom';

export default function Selection() {
    const navigate = useNavigate();

    const [artistList, setArtistList] = useState([
        {id: '47izDDvtOxxz3FzHYuUptd', name: 'Mcfly'},
        {id: '0gusqTJKxtU1UTmNRMHZcv', name: 'Dizzee Rascal'},
        {id: '5K4W6rqBFWDnAN6FQUkS6x', name: 'JAY-Z'},
    ]);
    const [artistId, setArtistId] = useState('Please select artist');
    const [songList, setSongList] = useState([]);
    const [songId, setSongId] = useState('Please select song');

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

    const handleSubmit = (e) => {
        var lyrics = getLyrics('random song');
        navigate('/lyrics');
    };

    const handleArtist = (e) => {
        setArtistId(e.target.value);
        getArtistSongs(e.target.value)
            .then(songs => {
                setSongList(songs)
            });
        // console.log(songs);
        // setSongList(songs);
    };

    const handleSong = (e) => {
        setSongId(e.target.value);
    };

    return (
        <div className="App container">
            <h1>Lyric lookup</h1>
            <select
                className="item"
                name="artist"
                value={artistId}
                onChange={(e) => handleArtist(e)}
                defaultValue={''}
            >
                <option value="">{'Please select an artist'}</option>
                {artistList.map((artist, index) => {
                    return (
                        <option key={index} value={artist.id}>
                            {artist.name}
                        </option>
                    );
                })}
            </select>
            {songList.length > 1 && (
                <select
                    className="item"
                    name="songList"
                    value={songId}
                    onChange={(e) => handleSong(e)}
                    defaultValue={''}
                >
                    <option value="">{'Please select an song'}</option>
                    {songList.map((song, index) => {
                        return (
                            <option key={index} value={song.id}>
                                {song.name}
                            </option>
                        );
                    })}
                </select>
            )}
            <button className="item" onClick={(e) => handleSubmit(e)}>
                Submit
            </button>
        </div>
    );
}
