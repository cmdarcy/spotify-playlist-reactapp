import Tracklist from "../tracklist/tracklist";
import styles from "./playlist.module.css";

export default function Playlist({ title, tracks, removeTrack, titleChange }) {
	return (
		<>
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
			<button>Save to Spotify</button>
		</>
	);
}
