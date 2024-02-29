import Track from "../track/track";
import styles from "./tracklist.module.css";

export default function Tracklist() {
	return (
		<div className={styles.tracklist}>
			<Track />
			<Track />
			<Track />
		</div>
	);
}
