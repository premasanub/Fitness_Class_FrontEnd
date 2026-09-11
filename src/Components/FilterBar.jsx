// function FilterBar({ category, setCategory }) {
//   return (
//     <div className="mb-6">

//       <select
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         className="w-full md:w-64 border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >

//         <option value="All">All Classes</option>

//         <option value="Beginner">
//           Beginner
//         </option>

//         <option value="Intermediate">
//           Intermediate
//         </option>

//         <option value="Advanced">
//           Advanced
//         </option>

//       </select>

//     </div>
//   );
// }

// export default FilterBar;

function FilterBar({ category, setCategory }) {
  return (
    <div className="w-full flex">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full md:w-64 h-11 border border-gray-300 rounded-lg shadow-sm bg-white indent-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="All">All Classes</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>
  );
}

export default FilterBar;