// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import api from "../../Service/api";
// import ClassCard from "../../Components/ClassCard";

// function Classes() {

//   const [classData, setClassData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchParams, setSearchParams] =
//     useSearchParams();

//   const categoryFromURL =
//     searchParams.get("category") || "All";

//   const [category, setCategory] =
//     useState(categoryFromURL);


//   // ===============================
//   // GET BACKEND CLASSES
//   // ===============================

//   useEffect(() => {

//     const fetchClasses = async () => {

//       try {

//         const response = await api.get("/classes");

//         setClassData(response.data.classes);

//       } catch (error) {

//         console.log(error);

//       } finally {

//         setLoading(false);

//       }
//     };

//     fetchClasses();

//   }, []);


//   // ===============================
//   // UPDATE CATEGORY FROM URL
//   // ===============================

//   useEffect(() => {

//     setCategory(categoryFromURL);

//   }, [categoryFromURL]);


//   // ===============================
//   // DROPDOWN CHANGE
//   // ===============================

//   const handleCategoryChange = (e) => {

//     const value = e.target.value;

//     setCategory(value);

//     if (value === "All") {

//       setSearchParams({});

//     } else {

//       setSearchParams({
//         category: value,
//       });

//     }
//   };


//   // ===============================
//   // FILTER BACKEND DATA
//   // ===============================

//   const filteredClasses =
//     category === "All"
//       ? classData
//       : classData.filter(
//           (item) =>
//             item.category?.toLowerCase() ===
//             category.toLowerCase()
//         );


//   if (loading) {

//     return (
//       <div className="text-center py-20">

//         <h2 className="text-2xl font-bold">
//           Loading classes...
//         </h2>

//       </div>
//     );

//   }


//   return (

//     <div className="max-w-7xl mx-auto py-12 px-6">

//       <h1 className="text-4xl font-bold text-center mb-10">
//         Available Fitness Classes
//       </h1>


//       {/* DROPDOWN */}

//       <div className="flex justify-center mb-10">

//         <select
//           value={category}
//           onChange={handleCategoryChange}
//           className="border border-gray-300 rounded-lg px-5 py-3 w-64"
//         >

//           <option value="All">
//             All Classes
//           </option>

//           <option value="Yoga">
//             Yoga
//           </option>

//           <option value="Zumba">
//             Zumba
//           </option>

//           <option value="Cardio">
//             Cardio
//           </option>

//           <option value="Strength Training">
//             Strength Training
//           </option>

//         </select>

//       </div>


//       {/* BACKEND CLASSES */}

//       {filteredClasses.length === 0 ? (

//         <p className="text-center text-gray-500 text-xl">
//           No classes available for {category}
//         </p>

//       ) : (

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

//           {filteredClasses.map((item) => (

//             <ClassCard
//               key={item._id}
//               item={item}
//             />

//           ))}

//         </div>

//       )}

//     </div>

//   );
// }

// export default Classes;

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../Service/api";
import ClassCard from "../../Components/ClassCard";

function Classes() {
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] =
    useSearchParams();

  const categoryFromURL =
    searchParams.get("category") || "All";

  const [category, setCategory] =
    useState(categoryFromURL);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/classes");

        setClassData(
          Array.isArray(response.data?.classes)
            ? response.data.classes
            : []
        );
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Unable to load classes."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    setCategory(categoryFromURL);
  }, [categoryFromURL]);

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
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center flex flex-col gap-3">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <h2 className="text-xl font-semibold text-gray-700">
            Loading classes...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-red-500">
            Unable to load classes
          </h2>

          <p className="text-gray-600">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="min-h-11 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl flex flex-col gap-10">
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Available Fitness Classes
        </h1>

        <p className="text-gray-500">
          Explore fitness classes and choose the right
          session for you.
        </p>
      </div>

      <div className="w-full flex justify-center">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full sm:w-64 h-11 border border-gray-300 rounded-lg bg-white indent-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">
            All Classes
          </option>

          <option value="Yoga">Yoga</option>

          <option value="Zumba">Zumba</option>

          <option value="Cardio">Cardio</option>

          <option value="Strength Training">
            Strength Training
          </option>
        </select>
      </div>

      {filteredClasses.length === 0 ? (
        <div className="min-h-48 flex items-center justify-center text-center">
          <p className="text-gray-500 text-lg">
            No classes available for {category}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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