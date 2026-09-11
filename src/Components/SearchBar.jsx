

function SearchBar({ search, setSearch }) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search Classes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full h-11 border border-gray-300 rounded-lg shadow-sm indent-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

export default SearchBar;