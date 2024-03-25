import Tracklist from "../tracklist/tracklist";
import styles from "../searchResults/SearchResults.module.css";

export default function SearchResults({ searchResults, addTrack }) {
	return (
		<section className={styles.searchContainer}>
			<h2 className={styles.searchTitle}>Search Results</h2>
			<Tracklist
				tracklist={searchResults}
				buttonHandler={addTrack}
				searchListButton={true}
			/>
		</section>
	);
}
