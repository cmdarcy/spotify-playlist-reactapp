import { useState } from "react";
import "./App.css";
import Playlist from "./components/playlist/playlist";
import SearchBar from "./components/searchBar/SearchBar";
import SearchResults from "./components/searchResults/SearchResults";

const dummySearchResults = [
	{
		title: "I Wish You Were Here",
		artist: "Pink Floyd",
		album: "Pink Floyd Album",
		id: 1,
	},
	{
		title: "Beautiful",
		artist: "Carole King",
		album: "Carole King Album",
		id: 2,
	},
	{
		title: "Bring It On Home to Me",
		artist: "Sam Cooke",
		album: "Sam Cooke Album",
		id: 3,
	},
	{
		title: "What's Inside",
		artist: "Waitress Cast",
		album: "The Waitress Soundtrack",
		id: 4,
	},
];

function App() {
	const [searchResults, setSearchResults] = useState(dummySearchResults);
	const [playListTitle, setPlaylistTitle] = useState("Default Playlist Title");
	const [playListTracks, setPlayListTracks] = useState([]);

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

	return (
		<div className="App">
			<div className="App-header">
				<h1>Spotify Playlist Creator</h1>
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
				/>
			</div>
		</div>
	);
}

export default App;
