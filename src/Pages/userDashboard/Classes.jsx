import classData from "../../data/classData";
import ClassCard from "../../components/ClassCard";
import SearchBar from "../../Components/SearchBar";
import FilterBar from "../../Components/FilterBar";
import { useState } from "react";
function Classes() {
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");

 const filteredClasses = classData.filter((item) => {

  const matchesSearch =
    item.className.toLowerCase().includes(search.toLowerCase());

  const matchesCategory =
    category === "All" || item.category === category;

  return matchesSearch && matchesCategory;

});

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Available Classes
      </h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

    <FilterBar
  category={category}
  setCategory={setCategory}
/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredClasses.map((item)=>(
          <ClassCard
            key={item.id}
            item={item}
          />
        ))}

      </div>

    </div>
  );
}

export default Classes;