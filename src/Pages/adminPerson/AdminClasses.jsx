import { useEffect, useState } from "react";
import api from "../../Service/api";
import { toast } from "react-toastify";

import yoga from "../../assets/yoga.jpg";
import zumba from "../../assets/zumba.jpg";
import cardio from "../../assets/cardio.jpg";
import strength from "../../assets/strength.jpg";


import {
  FaBookOpen,
  FaUserTie,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";




function AdminClasses() {

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

const classImages = {
    "yoga.jpg": yoga,
    "zumba.jpg": zumba,
    "cardio.jpg": cardio,
    "strength.jpg": strength,
  };
 const getClassImage = (image) => {
    return classImages[image] || yoga;
  };

  // =====================================================
  // FETCH CLASSES
  // =====================================================
useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get("/admin/classes");

        console.log("Admin Classes:", response.data);

        if (response.data.success) {
          setClasses(response.data.classes);
        }
      } catch (error) {
        console.log("Admin Classes Error:", error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load classes"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-gray-600 font-semibold">
          Loading classes...
        </p>
      </div>
    );
  }


  return (

    <div className="space-y-8">


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div>

        <div className="flex items-center gap-3">

          <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">

            <FaBookOpen className="text-2xl" />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Classes
            </h1>

            <p className="text-gray-500 mt-1">
              Manage all fitness classes
            </p>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* TOTAL CLASSES */}
      {/* ================================================= */}

      <div className="bg-white rounded-xl shadow p-6">

        <p className="text-gray-500 text-sm font-semibold">
          Total Classes
        </p>

        <p className="text-3xl font-bold text-gray-800 mt-2">
          {classes.length}
        </p>

      </div>


      {/* ================================================= */}
      {/* LOADING */}
      {/* ================================================= */}

      {loading && (

        <div className="bg-white rounded-xl shadow p-10 text-center">

          <p className="text-gray-500">
            Loading classes...
          </p>

        </div>

      )}


      {/* ================================================= */}
      {/* EMPTY */}
      {/* ================================================= */}

      {!loading && classes.length === 0 && (

        <div className="bg-white rounded-xl shadow p-10 text-center">

          <FaBookOpen className="text-5xl text-gray-300 mx-auto mb-4" />

          <h2 className="text-xl font-semibold text-gray-700">
            No Classes Found
          </h2>

          <p className="text-gray-500 mt-2">
            No fitness classes are available.
          </p>

        </div>

      )}


      {/* ================================================= */}
      {/* CLASS CARDS */}
      {/* ================================================= */}

      {!loading && classes.length > 0 && (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {classes.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden hover:shadow-lg transition"
            >


              {/* ================================================= */}
              {/* IMAGE */}
              {/* ================================================= */}

              <img
              src={getClassImage(item.image)}
              alt={item.title}
              className="w-full h-48 object-cover"
            />


              <div className="p-6">


                {/* ================================================= */}
                {/* TITLE */}
                {/* ================================================= */}

                <h2 className="text-xl font-bold text-gray-800">
                  {item.title}
                </h2>


                {/* CATEGORY */}
                <span className="inline-block mt-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {item.category}
                </span>


                {/* ================================================= */}
                {/* TRAINER */}
                {/* ================================================= */}

                <div className="flex items-center gap-3 mt-5">

                  {item.trainer?.profileImage ? (

                    <img
                      src={item.trainer.profileImage}
                      alt={item.trainer.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />

                  ) : (

                    <div className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center">

                      <FaUserTie />

                    </div>

                  )}

                  <div>

                    <p className="text-xs text-gray-400">
                      Trainer
                    </p>

                    <p className="font-semibold text-gray-700">
                      {item.trainer?.name || "Not assigned"}
                    </p>

                  </div>

                </div>


                {/* ================================================= */}
                {/* DATE */}
                {/* ================================================= */}

                <div className="flex items-center gap-3 mt-5 text-gray-600">

                  <FaCalendarAlt className="text-blue-500" />

                  <span>
                    {item.date}
                  </span>

                </div>


                {/* ================================================= */}
                {/* TIME */}
                {/* ================================================= */}

                <div className="flex items-center gap-3 mt-3 text-gray-600">

                  <FaClock className="text-purple-500" />

                  <span>
                    {item.time}
                  </span>

                </div>


                {/* ================================================= */}
                {/* DURATION */}
                {/* ================================================= */}

                <div className="flex items-center gap-3 mt-3 text-gray-600">

                  <FaClock className="text-orange-500" />

                  <span>
                    {item.duration}
                  </span>

                </div>


                {/* ================================================= */}
                {/* SEATS + PRICE */}
                {/* ================================================= */}

                <div className="flex justify-between mt-5 pt-4 border-t">


                  <div className="flex items-center gap-2 text-gray-600">

                    <FaUsers className="text-blue-500" />

                    <span>
                      {item.seats} Seats
                    </span>

                  </div>


                  <div className="flex items-center gap-1 font-bold text-green-600">

                    <FaRupeeSign />

                    <span>
                      {item.price}
                    </span>

                  </div>

                </div>


              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default AdminClasses;