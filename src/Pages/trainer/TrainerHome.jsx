import { useEffect, useState } from "react";

import {
  FaUsers,
  FaBookOpen,
  FaCalendarAlt,
  FaStar,
  FaClipboardList,
  FaClock,
} from "react-icons/fa";

import api from "../../Service/api";
import { toast } from "react-toastify";

function TrainerHome() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get logged-in trainer ID
  const getTrainerId = () => {
    const trainerId = localStorage.getItem("trainerId");

    if (trainerId) {
      return trainerId;
    }

    const userId = localStorage.getItem("userId");

    if (userId) {
      return userId;
    }

    const user = localStorage.getItem("user");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser?._id || parsedUser?.id;
      } catch (error) {
        console.log("User parsing error:", error);
      }
    }

    return null;
  };

  // =========================================
  // FETCH TRAINER DASHBOARD
  // =========================================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const trainerId = getTrainerId();

        if (!trainerId) {
          toast.error("Trainer ID not found. Please login again.");
          setLoading(false);
          return;
        }

        console.log("Trainer ID:", trainerId);

        const response = await api.get(
          `/trainers/dashboard/${trainerId}`
        );

        console.log("Trainer Dashboard Response:", response.data);

        if (response.data.success) {
          setDashboard(response.data);
        } else {
          toast.error(
            response.data.message || "Failed to load dashboard"
          );
        }
      } catch (error) {
        console.log("Trainer Dashboard Error:", error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load trainer dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">
          Loading dashboard...
        </div>
      </div>
    );
  }

  // =========================================
  // NO DATA
  // =========================================

  if (!dashboard) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          Unable to load dashboard
        </h2>

        <p className="text-gray-500 mt-2">
          Please login again and try.
        </p>
      </div>
    );
  }

  // =========================================
  // BACKEND DATA
  // =========================================

  const stats = dashboard.stats || {};

  const todayClasses = dashboard.todayClasses || [];

  const upcomingClasses = dashboard.upcomingClasses || [];

  const trainerName =
    dashboard.trainer?.name || "Trainer";

  return (
    <div className="space-y-10">

      {/* =========================================
          WELCOME SECTION
      ========================================= */}

      <div>
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome Back, {trainerName} 👋
        </h1>

        <p className="text-gray-600 mt-2">
          Manage your online fitness classes efficiently.
        </p>
      </div>


      {/* =========================================
          DASHBOARD CARDS
      ========================================= */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">

        {/* TOTAL STUDENTS */}

        <div className="bg-white rounded-xl shadow p-6">

          <FaUsers className="text-3xl text-blue-600 mb-4" />

          <h2 className="text-sm font-semibold text-gray-500">
            Total Students
          </h2>

          <p className="text-3xl font-bold mt-2 text-gray-800">
            {stats.totalStudents || 0}
          </p>

        </div>


        {/* MY CLASSES */}

        <div className="bg-white rounded-xl shadow p-6">

          <FaBookOpen className="text-3xl text-green-600 mb-4" />

          <h2 className="text-sm font-semibold text-gray-500">
            My Classes
          </h2>

          <p className="text-3xl font-bold mt-2 text-gray-800">
            {stats.totalClasses || 0}
          </p>

        </div>


        {/* TODAY'S SESSIONS */}

        <div className="bg-white rounded-xl shadow p-6">

          <FaCalendarAlt className="text-3xl text-purple-600 mb-4" />

          <h2 className="text-sm font-semibold text-gray-500">
            Today's Sessions
          </h2>

          <p className="text-3xl font-bold mt-2 text-gray-800">
            {stats.todaySessions || 0}
          </p>

        </div>


        {/* TOTAL BOOKINGS */}

        <div className="bg-white rounded-xl shadow p-6">

          <FaClipboardList className="text-3xl text-orange-500 mb-4" />

          <h2 className="text-sm font-semibold text-gray-500">
            Total Bookings
          </h2>

          <p className="text-3xl font-bold mt-2 text-gray-800">
            {stats.totalBookings || 0}
          </p>

        </div>


        {/* RATING */}

        <div className="bg-white rounded-xl shadow p-6">

          <FaStar className="text-3xl text-yellow-500 mb-4" />

          <h2 className="text-sm font-semibold text-gray-500">
            Rating
          </h2>

          <p className="text-3xl font-bold mt-2 text-gray-800">
            {stats.rating || 0}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            ⭐ Excellent
          </p>

        </div>

      </div>


      {/* =========================================
          TODAY'S SCHEDULE
      ========================================= */}

      <div>

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Today's Schedule
            </h2>

            <p className="text-gray-500 mt-1">
              Your classes scheduled for today
            </p>
          </div>

          <FaCalendarAlt className="text-2xl text-purple-600" />

        </div>


        {todayClasses.length === 0 ? (

          <div className="bg-white shadow rounded-xl p-8 text-center">

            <FaCalendarAlt className="text-4xl text-gray-300 mx-auto mb-3" />

            <p className="text-gray-500">
              No classes scheduled for today.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {todayClasses.map((item) => (

              <div
                key={item.id}
                className="bg-white shadow rounded-xl p-6 border border-gray-100 hover:shadow-lg transition"
              >

                {/* CLASS NAME */}

                <h3 className="text-xl font-bold text-gray-800">
                  {item.className}
                </h3>


                {/* TIME */}

                <div className="flex items-center gap-2 mt-4 text-gray-600">

                  <FaClock className="text-purple-600" />

                  <span>
                    {item.time}
                  </span>

                </div>


                {/* STUDENTS */}

                <div className="flex items-center gap-2 mt-3 text-gray-600">

                  <FaUsers className="text-blue-600" />

                  <span>
                    {item.students || 0} Students
                  </span>

                </div>


                {/* STATUS */}

                <div className="mt-5">

                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                      item.status === "Completed"
                        ? "bg-gray-100 text-gray-600"
                        : item.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* =========================================
          UPCOMING CLASSES
      ========================================= */}

      <div>

        <div className="mb-6">

          <h2 className="text-2xl font-bold text-gray-800">
            Upcoming Classes
          </h2>

          <p className="text-gray-500 mt-1">
            Your upcoming fitness sessions
          </p>

        </div>


        <div className="bg-white shadow rounded-xl overflow-hidden">

          {upcomingClasses.length === 0 ? (

            <div className="p-8 text-center">

              <FaCalendarAlt className="text-4xl text-gray-300 mx-auto mb-3" />

              <p className="text-gray-500">
                No upcoming classes found.
              </p>

            </div>

          ) : (

            upcomingClasses.map((item, index) => (

              <div
                key={item.id}
                className={`p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
                  index !== upcomingClasses.length - 1
                    ? "border-b"
                    : ""
                }`}
              >

                {/* CLASS INFO */}

                <div>

                  <h3 className="text-lg font-bold text-gray-800">
                    {item.className}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {item.date}
                  </p>

                </div>


                {/* TIME */}

                <div className="flex items-center gap-2 text-gray-600">

                  <FaClock className="text-purple-600" />

                  <span>
                    {item.time}
                  </span>

                </div>


                {/* STUDENTS */}

                <div className="flex items-center gap-2 text-gray-600">

                  <FaUsers className="text-blue-600" />

                  <span>
                    {item.students || 0} Students
                  </span>

                </div>


                {/* STATUS */}

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

                  Upcoming

                </span>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default TrainerHome;