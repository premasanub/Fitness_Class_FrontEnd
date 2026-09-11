
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

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);

        const response = await api.get("/admin/classes");

        if (response.data?.success) {
          setClasses(response.data.classes || []);
        } else {
          setClasses([]);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to load classes"
        );

        setClasses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
          <FaBookOpen className="text-2xl" />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-gray-800">
            Classes
          </h1>

          <p className="text-gray-500">
            Manage all fitness classes
          </p>
        </div>
      </div>

      {/* Total Classes */}
      <div className="bg-white rounded-xl shadow border border-gray-100 min-h-28 flex items-center">
        <div className="w-[92%] self-center flex flex-col gap-2">
          <p className="text-gray-500 text-sm font-semibold">
            Total Classes
          </p>

          <p className="text-3xl font-bold text-gray-800">
            {classes.length}
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl shadow border border-gray-100 min-h-48 flex items-center justify-center">
          <p className="text-gray-600 font-semibold">
            Loading classes...
          </p>
        </div>
      )}

      {/* Empty */}
      {!loading && classes.length === 0 && (
        <div className="bg-white rounded-xl shadow border border-gray-100 min-h-64 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <FaBookOpen className="text-5xl text-gray-300" />

            <h2 className="text-xl font-semibold text-gray-700">
              No Classes Found
            </h2>

            <p className="text-gray-500">
              No fitness classes are available.
            </p>
          </div>
        </div>
      )}

      {/* Class Cards */}
      {!loading && classes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {classes.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <img
                src={getClassImage(item.image)}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              <div className="w-[88%] self-center flex flex-col gap-4 min-h-80 justify-center">
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold text-gray-800">
                    {item.title}
                  </h2>

                  <span className="w-fit min-h-7 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold flex items-center">
                    <span className="indent-3">
                      {item.category || "Fitness"}
                    </span>
                  </span>
                </div>

                {/* Trainer */}
                <div className="flex items-center gap-3">
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

                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-400">
                      Trainer
                    </p>

                    <p className="font-semibold text-gray-700">
                      {item.trainer?.name || "Not assigned"}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3 text-gray-600">
                  <FaCalendarAlt className="text-blue-500" />

                  <span>
                    {item.date || "Date not available"}
                  </span>
                </div>

                {/* Time */}
                <div className="flex items-center gap-3 text-gray-600">
                  <FaClock className="text-purple-500" />

                  <span>
                    {item.time || "Time not available"}
                  </span>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-3 text-gray-600">
                  <FaClock className="text-orange-500" />

                  <span>
                    {item.duration || "Duration not available"}
                  </span>
                </div>

                {/* Seats and Price */}
                <div className="flex items-center justify-between min-h-12 border-t">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaUsers className="text-blue-500" />

                    <span>
                      {item.seats ?? 0} Seats
                    </span>
                  </div>

                  <div className="flex items-center gap-1 font-bold text-green-600">
                    <FaRupeeSign />

                    <span>
                      {item.price ?? 0}
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

