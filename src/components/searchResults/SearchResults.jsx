import Tracklist from "../tracklist/tracklist";

export default function SearchResults({ searchResults, addTrack }) {
	return (
		<>
			<h1>Search Results</h1>
			<Tracklist
				tracklist={searchResults}
				buttonHandler={addTrack}
				searchListButton={true}
			/>
		</>
	);
}
