
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
      <div className="min-h-60 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
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
      <div className="min-h-60 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
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

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Welcome */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500">
          Manage your fitness platform from here.
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="min-h-40 bg-blue-600 text-white rounded-xl shadow flex flex-col justify-center gap-3">
          <div className="w-[82%] self-center flex flex-col gap-3">
            <FaUsers className="text-3xl" />

            <p className="text-sm">
              Total Users
            </p>

            <h2 className="text-4xl font-bold">
              {stats.totalUsers ?? 0}
            </h2>
          </div>
        </div>

        <div className="min-h-40 bg-green-600 text-white rounded-xl shadow flex flex-col justify-center gap-3">
          <div className="w-[82%] self-center flex flex-col gap-3">
            <FaUserTie className="text-3xl" />

            <p className="text-sm">
              Total Trainers
            </p>

            <h2 className="text-4xl font-bold">
              {stats.totalTrainers ?? 0}
            </h2>
          </div>
        </div>

        <div className="min-h-40 bg-purple-600 text-white rounded-xl shadow flex flex-col justify-center gap-3">
          <div className="w-[82%] self-center flex flex-col gap-3">
            <FaBookOpen className="text-3xl" />

            <p className="text-sm">
              Total Classes
            </p>

            <h2 className="text-4xl font-bold">
              {stats.totalClasses ?? 0}
            </h2>
          </div>
        </div>

        <div className="min-h-40 bg-orange-500 text-white rounded-xl shadow flex flex-col justify-center gap-3">
          <div className="w-[82%] self-center flex flex-col gap-3">
            <FaClipboardList className="text-3xl" />

            <p className="text-sm">
              Total Bookings
            </p>

            <h2 className="text-4xl font-bold">
              {stats.totalBookings ?? 0}
            </h2>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="min-h-36 bg-white rounded-xl shadow border flex flex-col justify-center gap-3">
          <div className="w-[82%] self-center flex flex-col gap-3">
            <FaRupeeSign className="text-3xl text-green-600" />

            <p className="text-sm text-gray-500">
              Total Revenue
            </p>

            <h2 className="text-3xl font-bold text-gray-800">
              ₹{stats.totalRevenue ?? 0}
            </h2>
          </div>
        </div>

        <div className="min-h-36 bg-white rounded-xl shadow border flex flex-col justify-center gap-3">
          <div className="w-[82%] self-center flex flex-col gap-3">
            <FaClipboardList className="text-3xl text-blue-600" />

            <p className="text-sm text-gray-500">
              Paid Bookings
            </p>

            <h2 className="text-3xl font-bold text-gray-800">
              {stats.paidBookings ?? 0}
            </h2>
          </div>
        </div>

        <div className="min-h-36 bg-white rounded-xl shadow border flex flex-col justify-center gap-3">
          <div className="w-[82%] self-center flex flex-col gap-3">
            <FaStar className="text-3xl text-yellow-500" />

            <p className="text-sm text-gray-500">
              Total Feedback
            </p>

            <h2 className="text-3xl font-bold text-gray-800">
              {stats.totalFeedback ?? 0}
            </h2>
          </div>
        </div>

        <div className="min-h-36 bg-white rounded-xl shadow border flex flex-col justify-center gap-3">
          <div className="w-[82%] self-center flex flex-col gap-3">
            <FaCalendarDay className="text-3xl text-purple-600" />

            <p className="text-sm text-gray-500">
              Today's Bookings
            </p>

            <h2 className="text-3xl font-bold text-gray-800">
              {stats.todayBookings ?? 0}
            </h2>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Recent Bookings
          </h2>

          <p className="text-gray-500">
            Latest bookings from users
          </p>
        </div>

        <div className="bg-white rounded-xl shadow border overflow-hidden">
          {recentBookings.length === 0 ? (
            <div className="min-h-40 flex items-center justify-center">
              <p className="text-gray-500">
                No bookings found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px]">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="h-14 text-left indent-4">
                      User
                    </th>

                    <th className="h-14 text-left indent-4">
                      Class
                    </th>

                    <th className="h-14 text-left indent-4">
                      Trainer
                    </th>

                    <th className="h-14 text-left indent-4">
                      Payment
                    </th>

                    <th className="h-14 text-left indent-4">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentBookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="h-16">
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-gray-800">
                            {booking.user?.name ||
                              "Unknown User"}
                          </p>

                          <p className="text-sm text-gray-500">
                            {booking.user?.email || ""}
                          </p>
                        </div>
                      </td>

                      <td>
                        <p className="font-medium">
                          {booking.class?.title ||
                            "Fitness Class"}
                        </p>
                      </td>

                      <td>
                        <span className="text-gray-700">
                          {booking.trainer?.name ||
                            "Unknown Trainer"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`min-h-8 w-fit rounded-full text-sm font-semibold flex items-center ${
                            booking.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          <span className="indent-3">
                            {booking.paymentStatus ||
                              "Pending"}
                          </span>
                        </span>
                      </td>

                      <td>
                        <span
                          className={`min-h-8 w-fit rounded-full text-sm font-semibold flex items-center ${
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
                          <span className="indent-3">
                            {booking.bookingStatus ||
                              "Pending"}
                          </span>
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

