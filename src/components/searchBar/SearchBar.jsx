export default function SearchBar({ searchTerm, searchInputHandler }) {
	return <input type="text" value={searchTerm} onChange={searchInputHandler} />;
}
