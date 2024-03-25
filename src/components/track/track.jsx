import styles from "./track.module.css";

export default function Track({ title, artist, album }) {
	return (
		<div className={styles.trackContainer}>
			<h2 className={styles.trackTitle}>{title}</h2>
			<h3 className={styles.trackArtist}>{artist}</h3>
			<h3 className={styles.trackArtist}>{album}</h3>
		</div>
	);
}
