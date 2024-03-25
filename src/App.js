import { useEffect, useState } from "react";
import "./App.css";
import Playlist from "./components/playlist/playlist";
import SearchBar from "./components/searchBar/SearchBar";
import SearchResults from "./components/searchResults/SearchResults";
import { url } from "./token";

function App() {
	const [searchResults, setSearchResults] = useState([]);
	const [playListTitle, setPlaylistTitle] = useState(
		"Enter Playlist Title Here"
	);
	const [playListTracks, setPlayListTracks] = useState([]);
	const [token, setToken] = useState();
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem("token");
		let timeout = window.localStorage.getItem("timeout");

		if (timeout) {
			setTimeout(() => {
				alert("The token expired! Please refresh the page and login again.");
				setToken("");
				window.localStorage.removeItem("token");
				window.localStorage.removeItem("timeout");
			}, timeout * 1000);
		}

		if (!token && hash) {
			token = hash
				.substring(1)
				.split("&")
				.find((elem) => elem.startsWith("access_token"))
				.split("=")[1];
			timeout = hash
				.substring(1)
				.split("&")
				.find((elem) => elem.startsWith("expires_in"))
				.split("=")[1];

			window.location.hash = "";
			window.localStorage.setItem("token", token);
			window.localStorage.setItem("timeout", timeout);
		}

		setToken(token);
	}, []);

	function login() {
		window.location = url;
	}

	function logout() {
		setToken("");
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("timeout");
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

	async function savePlaylistHandler() {
		// Get userID
		let userId;
		try {
			const response = await fetch(`https://api.spotify.com/v1/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw new Error("Failed to retrieve userId");
			}
			const data = await response.json();
			userId = data.id;
		} catch (error) {
			console.log("Error:", error);
		}

		// Add new playlist using userID, store playlistID
		let playlistID;
		try {
			const bodyData = {
				name: `${playListTitle}`,
			};
			const response = await fetch(
				`https://api.spotify.com/v1/users/${userId}/playlists `,
				{
					method: "POST",
					headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(bodyData),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to upload new playlist");
			}
			const data = await response.json();
			playlistID = data.id;
		} catch (error) {
			console.log("Error:", error);
		}

		//Gather track uri's
		const savedPlaylistURIs = [];
		for (let track of playListTracks) {
			savedPlaylistURIs.push(track.uri);
		}

		//Add songs to new playlist
		try {
			const bodyData = { uris: savedPlaylistURIs };
			const response = await fetch(
				`https://api.spotify.com/v1/playlists/${playlistID}/tracks `,
				{
					method: "POST",
					headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(bodyData),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to upload new playlist");
			}
		} catch (error) {
			console.log("Error:", error);
		}
	}

	function searchInputHandler(e) {
		setSearchTerm(e.target.value);
	}

	async function searchButtonHandler() {
		try {
			const response = await fetch(
				`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error("Failed to fetch data");
			}

			const data = await response.json();
			if (data.tracks.items.length === 0) {
				alert(`No search results found please try a different search!`);
			} else {
				setSearchResults(
					data.tracks.items.map((item) => {
						return {
							title: item.name,
							artist: item.artists[0].name,
							album: item.album.name,
							id: item.id,
							uri: item.uri,
						};
					})
				);
			}
		} catch (error) {
			console.log("Error:", error);
		}
	}

	return (
		<div className="App">
			<header className="App-header">
				<h1>Spotify Playlist Creator</h1>
				{token ? (
					<button onClick={logout} className="logBtn">
						Logout
					</button>
				) : (
					<button onClick={login} className="logBtn">
						Login
					</button>
				)}
				<SearchBar
					searchTerm={searchTerm}
					searchInputHandler={searchInputHandler}
					className="SearchBar"
				/>
				{token && (
					<button onClick={searchButtonHandler} className="searchBtn">
						Search
					</button>
				)}
			</header>
			<div className="App-body">
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
