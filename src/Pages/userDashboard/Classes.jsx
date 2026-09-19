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
      <div className="w-full min-h-[70vh] flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-5" />

          <h2 className="text-xl font-semibold text-gray-700">
            Loading classes...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait while we load available classes.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Unable to load classes
          </h2>

          <p className="text-gray-500 mt-3">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 min-h-12 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Available Fitness Classes
          </h1>

          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Explore fitness classes and choose the right
            session for you.
          </p>
        </div>

        {/* FILTER */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-semibold text-gray-800">
                Filter Classes
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Select a category to view available
                classes.
              </p>
            </div>

            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full sm:w-64 h-12 px-4 border border-gray-300 rounded-xl bg-white text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
        </div>

        {/* RESULTS */}
        {filteredClasses.length === 0 ? (
          <div className="bg-white min-h-56 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center text-center p-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                No Classes Available
              </h2>

              <p className="text-gray-500 mt-2">
                No classes are available for{" "}
                <span className="font-semibold">
                  {category}
                </span>
                .
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredClasses.map((item) => (
              <ClassCard
                key={item._id}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Classes;