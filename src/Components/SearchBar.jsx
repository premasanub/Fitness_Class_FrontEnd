// function SearchBar({ search, setSearch }) {
//   return (
//     <div className="mb-6">

//       <input
//         type="text"
//         placeholder="Search Classes..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//     </div>
//   );
// }

// export default SearchBar;

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