import Track from "../track/track";
import styles from "./tracklist.module.css";

export default function Tracklist({
	tracklist,
	buttonHandler,
	searchListButton,
}) {
	return tracklist.map((track) => (
		<>
			<Track
				title={track.title}
				artist={track.artist}
				album={track.album}
				key={track.id}
			/>
			<button onClick={() => buttonHandler(track)}>
				{searchListButton ? "Add" : "Remove"}
			</button>
		</>
	));
}
