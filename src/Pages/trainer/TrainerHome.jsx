

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
        return parsedUser?._id || parsedUser?.id || null;
      } catch {
        return null;
      }
    }

    return null;
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const trainerId = getTrainerId();

        if (!trainerId) {
          toast.error("Trainer ID not found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await api.get(
          `/trainers/dashboard/${trainerId}`
        );

        if (response.data?.success) {
          setDashboard(response.data);
        } else {
          toast.error(
            response.data?.message ||
              "Failed to load dashboard"
          );
        }
      } catch (error) {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />

          <p className="text-gray-600 font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg flex flex-col items-center text-center gap-3">
          <h2 className="text-xl font-bold text-gray-800">
            Unable to load dashboard
          </h2>

          <p className="text-gray-500">
            Please login again and try.
          </p>
        </div>
      </div>
    );
  }

  const stats = dashboard.stats || {};
  const todayClasses = dashboard.todayClasses || [];
  const upcomingClasses = dashboard.upcomingClasses || [];

  const trainerName =
    dashboard.trainer?.name || "Trainer";

  const dashboardCards = [
    {
      title: "Total Students",
      value: stats.totalStudents ?? 0,
      icon: <FaUsers />,
      iconClass: "text-blue-600",
    },
    {
      title: "My Classes",
      value: stats.totalClasses ?? 0,
      icon: <FaBookOpen />,
      iconClass: "text-green-600",
    },
    {
      title: "Today's Sessions",
      value: stats.todaySessions ?? 0,
      icon: <FaCalendarAlt />,
      iconClass: "text-purple-600",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings ?? 0,
      icon: <FaClipboardList />,
      iconClass: "text-orange-500",
    },
    {
      title: "Rating",
      value: stats.rating ?? stats.averageRating ?? 0,
      icon: <FaStar />,
      iconClass: "text-yellow-500",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-10">
      {/* WELCOME */}
      <section className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome Back, {trainerName} 👋
        </h1>

        <p className="text-gray-600">
          Manage your online fitness classes efficiently.
        </p>
      </section>

      {/* DASHBOARD CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {dashboardCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col gap-4 min-h-40"
          >
            <div className={`text-3xl ${card.iconClass}`}>
              {card.icon}
            </div>

            <h2 className="text-sm font-semibold text-gray-500">
              {card.title}
            </h2>

            <p className="text-3xl font-bold text-gray-800">
              {card.value}
            </p>

            {card.title === "Rating" && (
              <span className="text-sm text-gray-500">
                ⭐ Excellent
              </span>
            )}
          </div>
        ))}
      </section>

      {/* TODAY'S SCHEDULE */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-gray-800">
              Today's Schedule
            </h2>

            <p className="text-gray-500">
              Your classes scheduled for today
            </p>
          </div>

          <FaCalendarAlt className="text-2xl text-purple-600 shrink-0" />
        </div>

        {todayClasses.length === 0 ? (
          <div className="bg-white shadow rounded-xl min-h-40 flex flex-col items-center justify-center text-center gap-3">
            <FaCalendarAlt className="text-4xl text-gray-300" />

            <p className="text-gray-500">
              No classes scheduled for today.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todayClasses.map((item) => (
              <article
                key={item.id || item._id}
                className="bg-white shadow rounded-xl border border-gray-100 hover:shadow-lg transition flex flex-col gap-5"
              >
                <h3 className="text-xl font-bold text-gray-800">
                  {item.className || item.title || "Fitness Class"}
                </h3>

                <div className="flex items-center gap-3 text-gray-600">
                  <FaClock className="text-purple-600 shrink-0" />

                  <span>
                    {item.time || "Time not available"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <FaUsers className="text-blue-600 shrink-0" />

                  <span>
                    {item.students ?? 0} Students
                  </span>
                </div>

                <div>
                  <span
                    className={`inline-flex items-center rounded-full text-sm font-semibold ${
                      item.status === "Completed"
                        ? "bg-gray-100 text-gray-600"
                        : item.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status || "Upcoming"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* UPCOMING CLASSES */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-gray-800">
            Upcoming Classes
          </h2>

          <p className="text-gray-500">
            Your upcoming fitness sessions
          </p>
        </div>

        <div className="bg-white shadow rounded-xl overflow-hidden">
          {upcomingClasses.length === 0 ? (
            <div className="min-h-40 flex flex-col items-center justify-center text-center gap-3">
              <FaCalendarAlt className="text-4xl text-gray-300" />

              <p className="text-gray-500">
                No upcoming classes found.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {upcomingClasses.map((item, index) => (
                <div
                  key={item.id || item._id}
                  className={`flex flex-col md:flex-row md:items-center md:justify-between gap-5 ${
                    index !== upcomingClasses.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  {/* CLASS INFO */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {item.className ||
                        item.title ||
                        "Fitness Class"}
                    </h3>

                    <p className="text-gray-500">
                      {item.date || "Date not available"}
                    </p>
                  </div>

                  {/* TIME */}
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaClock className="text-purple-600 shrink-0" />

                    <span>
                      {item.time || "Time not available"}
                    </span>
                  </div>

                  {/* STUDENTS */}
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaUsers className="text-blue-600 shrink-0" />

                    <span>
                      {item.students ?? 0} Students
                    </span>
                  </div>

                  {/* STATUS */}
                  <span className="bg-blue-100 text-blue-700 rounded-full text-sm font-semibold inline-flex items-center">
                    Upcoming
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default TrainerHome;