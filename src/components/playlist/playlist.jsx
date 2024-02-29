import Tracklist from "../tracklist/tracklist";
import styles from "./playlist.module.css";

export default function Playlist() {
	return (
		<>
			<h1 className={styles.h1}>Playlist</h1>
			<Tracklist />
		</>
	);
}
