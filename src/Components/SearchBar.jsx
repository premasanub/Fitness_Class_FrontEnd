function SearchBar({ search, setSearch }) {
  return (
    <div className="m-0 p-0">
      <input
        type="text"
        placeholder="Search Classes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 m-0 p-0"
      />
    </div>
  );
}

export default SearchBar;
