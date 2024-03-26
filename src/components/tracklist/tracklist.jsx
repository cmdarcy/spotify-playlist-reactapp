import Track from "../track/track";

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
				uri={track.uri}
			/>
			<button onClick={() => buttonHandler(track)} key={`button-${track.id}`}>
				{searchListButton ? "Add" : "Remove"}
			</button>
		</>
	));
}
