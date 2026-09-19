import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserTie,
  FaBookOpen,
  FaClipboardList,
  FaRupeeSign,
  FaStar,
  FaCalendarDay,
} from "react-icons/fa";

import api from "../../Service/api";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const response = await api.get("/admin/dashboard");

        if (response.data?.success) {
          setDashboard(response.data);
        } else {
          setDashboard(null);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to load admin dashboard"
        );

        setDashboard(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-60 p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />

          <p className="text-lg font-semibold text-gray-600">
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-60 p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <FaClipboardList className="text-5xl text-gray-300" />

          <h2 className="text-xl font-semibold text-gray-700">
            Unable to load admin dashboard
          </h2>

          <p className="text-gray-500">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const stats = dashboard.stats || {};
  const recentBookings = dashboard.recentBookings || [];

  const mainStats = [
    {
      title: "Total Users",
      value: stats.totalUsers ?? 0,
      icon: <FaUsers />,
      color: "bg-blue-600",
    },
    {
      title: "Total Trainers",
      value: stats.totalTrainers ?? 0,
      icon: <FaUserTie />,
      color: "bg-green-600",
    },
    {
      title: "Total Classes",
      value: stats.totalClasses ?? 0,
      icon: <FaBookOpen />,
      color: "bg-purple-600",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings ?? 0,
      icon: <FaClipboardList />,
      color: "bg-orange-500",
    },
  ];

  const secondaryStats = [
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue ?? 0}`,
      icon: <FaRupeeSign />,
      color: "text-green-600",
    },
    {
      title: "Paid Bookings",
      value: stats.paidBookings ?? 0,
      icon: <FaClipboardList />,
      color: "text-blue-600",
    },
    {
      title: "Total Feedback",
      value: stats.totalFeedback ?? 0,
      icon: <FaStar />,
      color: "text-yellow-500",
    },
    {
      title: "Today's Bookings",
      value: stats.todayBookings ?? 0,
      icon: <FaCalendarDay />,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-10 p-1">
      {/* Welcome */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500">
          Manage your fitness platform from here.
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((item) => (
          <div
            key={item.title}
            className={`${item.color} text-white rounded-xl shadow-sm p-6 min-h-44 flex flex-col justify-center gap-4`}
          >
            <div className="text-3xl">
              {item.icon}
            </div>

            <p className="text-sm font-medium">
              {item.title}
            </p>

            <h2 className="text-4xl font-bold">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {secondaryStats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-36 flex flex-col justify-center gap-3"
          >
            <div className={`text-3xl ${item.color}`}>
              {item.icon}
            </div>

            <p className="text-sm text-gray-500">
              {item.title}
            </p>

            <h2 className="text-3xl font-bold text-gray-800">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Recent Bookings
          </h2>

          <p className="text-gray-500">
            Latest bookings from users
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {recentBookings.length === 0 ? (
            <div className="min-h-40 p-8 flex items-center justify-center">
              <p className="text-gray-500">
                No bookings found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                      User
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                      Class
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                      Trainer
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                      Payment
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentBookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-5">
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-gray-800">
                            {booking.user?.name ||
                              "Unknown User"}
                          </p>

                          <p className="text-sm text-gray-500 break-all">
                            {booking.user?.email || ""}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <p className="font-medium text-gray-800">
                          {booking.class?.title ||
                            "Fitness Class"}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <span className="text-gray-700">
                          {booking.trainer?.name ||
                            "Unknown Trainer"}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold ${
                            booking.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.paymentStatus || "Pending"}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold ${
                            booking.bookingStatus ===
                            "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : booking.bookingStatus ===
                                "Completed"
                              ? "bg-blue-100 text-blue-700"
                              : booking.bookingStatus ===
                                "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.bookingStatus || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

