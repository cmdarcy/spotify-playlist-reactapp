import Tracklist from "../tracklist/tracklist";
import styles from "./playlist.module.css";

export default function Playlist({
	title,
	tracks,
	removeTrack,
	titleChange,
	savePlaylist,
}) {
	return (
		<section className={styles.playlistContainer}>
			<input
				value={title}
				onChange={titleChange}
				type="text"
				className={styles.playListTitle}
			/>
			<Tracklist
				tracklist={tracks}
				buttonHandler={removeTrack}
				searchListButton={false}
			/>
			<button onClick={savePlaylist} className={styles.playlistSavebtn}>
				Save to Spotify
			</button>
		</section>
	);
}
