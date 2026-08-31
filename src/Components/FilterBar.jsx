function FilterBar({ category, setCategory }) {
  return (
    <div className="m-0 p-0">

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full md:w-64 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 m-0 p-0"
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
