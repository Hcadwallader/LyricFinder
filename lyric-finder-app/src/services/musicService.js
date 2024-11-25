import { Buffer } from 'buffer';

const baseUrl = 'https://api.spotify.com/v1/';
const loginUrl = 'https://accounts.spotify.com/api/token';

export const getArtistId = async (artistName) => {
	//   fetch(`${baseUrl}search?q=${artistName}`)
	//     .then((data) => {
	//       console.log(data);
	//     })
	//     .catch((error) => console.error(error));

	var client_id = '2eb5efccbdd64e9daca506b2a9de7e9e';
	var client_secret = '7f1a0d75767441f7bc7c83bb319d00ea';

	let authTokenResponse = await fetch(loginUrl, {
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
	});

	let suceessfulLogin = await authTokenResponse.status;
	if (suceessfulLogin && !authTokenResponse.ok) {
		return null;
	}
	let data = await authTokenResponse.json();
	window.localStorage.setItem('token', data.access_token);
	console.log(data.access_token);
	console.log('artistName ' + artistName);
	console.log('baseUrl ' + baseUrl);
	console.log(`url + (${baseUrl}search?q=${artistName})`);
	let artistIdResponse = await fetch(
		`${baseUrl}search?q=${artistName}&type=artist`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${data.access_token}`,
			},
		}
	);

	let artistId = await artistIdResponse.json();
	console.log(artistId);
	return artistId;
};

// fetch(`${baseUrl}search?q=${artistName}`, {
// 	method: 'GET',
// 	withCredentials: true,
// 	credentials: 'include',
// 	headers: {
// 		Authorization: '`Bearer ${data.token}`',
// 		'X-FP-API-KEY': 'iphone',
// 		'Content-Type': 'application/json',
// 	},
// });
// 		.then((data) => {
// 			console.log(data);
// 		})
// 		.catch((error) => console.error(error));
// };
// export const getArtistsSongs = () => {
//   fetch(url).then();
// };

// export const getLyrics = () => {
//   fetch(url).then();
// };
