import { Buffer } from 'buffer';
import { useState } from 'react';

const baseUrl = 'https://api.spotify.com/v1/';
const loginUrl = 'https://accounts.spotify.com/api/token';

export const getArtistId = async (artistName) => {
	var authToken = await getAuthToken();
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
	getAuthToken().then();
	fetch(`${baseUrl}artists/${artistID}/top-tracks`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	})
		.then((response) => response.json())
		.then((json) => {
			if (json.tracks != null) {
				let trackList = [];
				json.tracks.forEach((track) => {
					trackList.push({ id: track.id, name: track.name });
				});
				return trackList;
			}
		});

	// let data = await artistDetailsResponse.json();
	// console.log('Data returned from searching for songs for artist: ');
	// console.log(data);

	// if (data.tracks != null) {
	// 	let trackList = [];
	// 	data.tracks.forEach((track) => {
	// 		trackList.push({ id: track.id, name: track.name });
	// 	});
	// 	console.log('track list: ');
	// 	console.log(trackList);
	// 	return trackList;
	// }
};

export const getLyrics = (songName) => {
	return `It's all about you (it's about you)\n
It's all about you, baby (it's all about)\n
It's all about you (it's about you)\n
It's all about you\n
Yesterday, you asked me something I thought you knew\n
So I told you with a smile, "It's all about you"\n
Then you whispered in my ear and you told me too\n
Said, "You make my life worthwhile, it's all about you"\n
And I would answer all your wishes\n
If you asked me to\n
But if you deny me one of your kisses\n
Don't know what I'd do\n
So hold me close and say three words, like you used to do\n
Dancing on the kitchen tiles\n
It's all about you, yeah\n
And I would answer all your wishes\n
If you asked me to\n
But if you deny me one of your kisses\n
Don't know what I'd do\n
So hold me close and say three words, like you used to dov
Dancing on the kitchen tiles\n
Yes, you make my life worthwhile\n
So I told you with a smile\n
It's all about you\n
It's all about you (it's about you)\n
It's all about you, baby (it's all about)\n
It's all about you (it's about you)\n
It's all about you, baby\n
It's all about you (it's about you)\n
It's all about you, baby (it's all about you)\n
It's all about you (it's about you)\n
It's all about you\n
It's all about you`;
};

export const getAuthToken = () => {
	// TODO: add code here to check if we have an unexpired token already, before getting a fresh one

	console.log('getting fresh auth token');

	var client_id = '2eb5efccbdd64e9daca506b2a9de7e9e';
	var client_secret = '7f1a0d75767441f7bc7c83bb319d00ea';

	fetch(loginUrl, {
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
		.then((response) => response.json())
		.then((data) => {
			window.localStorage.setItem('token', data.access_token);
		});
};
