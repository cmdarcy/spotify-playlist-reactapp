import "./App.css";
import Playlist from "./components/playlist/playlist";
import SaveToSpotify from "./components/saveToSpotify/SaveToSpotifyBtn";
import SearchBar from "./components/searchBar/SearchBar";
import SearchBtn from "./components/searchBtn/SearchBtn";
import SearchResults from "./components/searchResults/SearchResults";

function App() {
	return (
		<div className="App">
			<div className="App-header">
				<h1>Spotify Playlist Creator</h1>
			</div>
			<div className="App-body">
				<SearchBar />
				<SearchBtn />
				<SearchResults />
				<Playlist />
				<SaveToSpotify />
			</div>
		</div>
	);
}

export default App;
