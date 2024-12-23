import { Buffer } from 'buffer';

const baseUrl = 'https://api.spotify.com/v1/';
const loginUrl = 'https://accounts.spotify.com/api/token';

export const getArtistId = async (artistName) => {
	let authToken = await getAuthToken();
	let artistIdResponse = await fetch(
		`${baseUrl}search?q=${artistName}&type=artist`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		}
	);

	let data = await artistIdResponse.json();
	console.log('Data returned from searching for artist: ');
	console.log(data);

	if (data.artists != null) {
		console.log('returning ' + data.artists.items[0].id);
		return data.artists.items[0].id;
	}
};

export const getArtistSongs = (artistID) => {
	console.log('getting artist songs');
	return getAuthToken().then((authToken) => {
		return fetch(`${baseUrl}artists/${artistID}/top-tracks`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log('song list data:');
				console.log(data);
				let trackList = [];
				data.tracks.forEach((track) => {
					trackList.push({ id: track.id, name: track.name });
				});
				console.log('track list: ');
				console.log(trackList);
				return trackList;
			});
	});
};

const getAuthToken = () => {
	// TODO: add code here to check if we have an unexpired token already, before getting a fresh one

	console.log('getting fresh auth token');

	let client_id = '2eb5efccbdd64e9daca506b2a9de7e9e';
	let client_secret = '7f1a0d75767441f7bc7c83bb319d00ea';

	return fetch(loginUrl, {
		method: 'POST',
		headers: {
			Authorization:
				'Basic ' +
				new Buffer.from(client_id + ':' + client_secret).toString(
					'base64'
				),
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: 'grant_type=client_credentials',
		json: true,
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return data.access_token;
		});
};

export const getLyrics = (songName) => {
	return `It's all about you (it's about you)
It's all about you, baby (it's all about)
It's all about you (it's about you)
It's all about you
Yesterday, you asked me something I thought you knew
So I told you with a smile, "It's all about you"
Then you whispered in my ear and you told me too
Said, "You make my life worthwhile, it's all about you"
And I would answer all your wishes
If you asked me to
But if you deny me one of your kisses
Don't know what I'd do
So hold me close and say three words, like you used to do
Dancing on the kitchen tiles
It's all about you, yeah
And I would answer all your wishes
If you asked me to
But if you deny me one of your kisses
Don't know what I'd do
So hold me close and say three words, like you used to do
Dancing on the kitchen tiles
Yes, you make my life worthwhile
So I told you with a smile
It's all about you
It's all about you (it's about you)
It's all about you, baby (it's all about)
It's all about you (it's about you)
It's all about you, baby
It's all about you (it's about you)
It's all about you, baby (it's all about you)
It's all about you (it's about you)
It's all about you
It's all about you`;
};
