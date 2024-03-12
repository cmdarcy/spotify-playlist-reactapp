import { useEffect, useState } from "react";
import "./App.css";
import Playlist from "./components/playlist/playlist";
import SearchBar from "./components/searchBar/SearchBar";
import SearchResults from "./components/searchResults/SearchResults";
import { url } from "./token";

const dummySearchResults = [
	{
		title: "I Wish You Were Here",
		artist: "Pink Floyd",
		album: "Pink Floyd Album",
		id: 1,
		uri: 567,
	},
	{
		title: "Beautiful",
		artist: "Carole King",
		album: "Carole King Album",
		id: 2,
		uri: 789,
	},
	{
		title: "Bring It On Home to Me",
		artist: "Sam Cooke",
		album: "Sam Cooke Album",
		id: 3,
		uri: 91011,
	},
	{
		title: "What's Inside",
		artist: "Waitress Cast",
		album: "The Waitress Soundtrack",
		id: 4,
		uri: 121314,
	},
];

function App() {
	const [searchResults, setSearchResults] = useState(dummySearchResults);
	const [playListTitle, setPlaylistTitle] = useState("Default Playlist Title");
	const [playListTracks, setPlayListTracks] = useState([]);
	const [token, setToken] = useState();

	useEffect(() => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem("token");

		if (!token && hash) {
			token = hash
				.substring(1)
				.split("&")
				.find((elem) => elem.startsWith("access_token"))
				.split("=")[1];

			window.location.hash = "";
			window.localStorage.setItem("token", token);
		}

		setToken(token);
	}, []);

	function logout() {
		setToken("");
		window.localStorage.removeItem("token");
	}

	function addTrackHandler(track) {
		let exists = false;
		for (let i = 0; i < playListTracks.length; i++) {
			if (playListTracks[i].id === track.id) {
				exists = true;
				break;
			}
		}

		if (!exists) {
			console.log(`The track is not currently in the playlist`);
			setPlayListTracks([track, ...playListTracks]);
		} else {
			console.log(`The track is already in the playlist`);
		}
	}

	function removeTrackHandler(track) {
		setPlayListTracks(playListTracks.filter((item) => item.id !== track.id));
	}

	function titleChangeHandler(e) {
		setPlaylistTitle(e.target.value);
	}

	function savePlaylistHandler() {
		const savedPlaylistURI = [];
		for (let track of playListTracks) {
			savedPlaylistURI.push(track.uri);
		}
		console.log(savedPlaylistURI);
	}

	return (
		<div className="App">
			<div className="App-header">
				<h1>Spotify Playlist Creator</h1>
				{token ? (
					<button onClick={logout}>Logout</button>
				) : (
					<a href={`${url}`}>Login to Spotify</a>
				)}
			</div>
			<div className="App-body">
				<SearchBar />
				<button>Search</button>
				<SearchResults
					searchResults={searchResults}
					addTrack={addTrackHandler}
				/>
				<Playlist
					title={playListTitle}
					tracks={playListTracks}
					removeTrack={removeTrackHandler}
					titleChange={titleChangeHandler}
					savePlaylist={savePlaylistHandler}
				/>
			</div>
		</div>
	);
}

export default App;
