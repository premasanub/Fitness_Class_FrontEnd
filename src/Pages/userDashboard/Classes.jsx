import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../Service/api";
import ClassCard from "../../Components/ClassCard";

function Classes() {

  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] =
    useSearchParams();

  const categoryFromURL =
    searchParams.get("category") || "All";

  const [category, setCategory] =
    useState(categoryFromURL);


  // ===============================
  // GET BACKEND CLASSES
  // ===============================

  useEffect(() => {

    const fetchClasses = async () => {

      try {

        const response = await api.get("/classes");

        setClassData(response.data.classes);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchClasses();

  }, []);


  // ===============================
  // UPDATE CATEGORY FROM URL
  // ===============================

  useEffect(() => {

    setCategory(categoryFromURL);

  }, [categoryFromURL]);


  // ===============================
  // DROPDOWN CHANGE
  // ===============================

  const handleCategoryChange = (e) => {

    const value = e.target.value;

    setCategory(value);

    if (value === "All") {

      setSearchParams({});

    } else {

      setSearchParams({
        category: value,
      });

    }
  };


  // ===============================
  // FILTER BACKEND DATA
  // ===============================

  const filteredClasses =
    category === "All"
      ? classData
      : classData.filter(
          (item) =>
            item.category?.toLowerCase() ===
            category.toLowerCase()
        );


  if (loading) {

    return (
      <div className="text-center py-20">

        <h2 className="text-2xl font-bold">
          Loading classes...
        </h2>

      </div>
    );

  }


  return (

    <div className="max-w-7xl mx-auto py-12 px-6">

      <h1 className="text-4xl font-bold text-center mb-10">
        Available Fitness Classes
      </h1>


      {/* DROPDOWN */}

      <div className="flex justify-center mb-10">

        <select
          value={category}
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded-lg px-5 py-3 w-64"
        >

          <option value="All">
            All Classes
          </option>

          <option value="Yoga">
            Yoga
          </option>

          <option value="Zumba">
            Zumba
          </option>

          <option value="Cardio">
            Cardio
          </option>

          <option value="Strength Training">
            Strength Training
          </option>

        </select>

      </div>


      {/* BACKEND CLASSES */}

      {filteredClasses.length === 0 ? (

        <p className="text-center text-gray-500 text-xl">
          No classes available for {category}
        </p>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredClasses.map((item) => (

            <ClassCard
              key={item._id}
              item={item}
            />

          ))}

        </div>

      )}

    </div>

  );
}

export default Classes;