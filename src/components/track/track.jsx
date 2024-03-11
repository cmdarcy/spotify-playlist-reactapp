import styles from "./track.module.css";

export default function Track({ title, artist, album }) {
	return (
		<>
			<h1 className={styles.trackTitle}>{title}</h1>
			<h2 className={styles.trackArtist}>{artist}</h2>
			<h2 className={styles.trackArtist}>{album}</h2>
		</>
	);
}
