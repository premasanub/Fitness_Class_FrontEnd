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

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // =====================================================
  // FETCH ADMIN DASHBOARD
  // =====================================================

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const response =
          await api.get(
            "/admin/dashboard"
          );


        console.log(
          "Admin Dashboard:",
          response.data
        );


        if (response.data.success) {

          setDashboard(
            response.data
          );

        }

      } catch (error) {

        console.log(
          "Admin Dashboard Error:",
          error
        );

        toast.error(
          error.response?.data?.message ||
          "Failed to load admin dashboard"
        );

      } finally {

        setLoading(false);

      }

    };


    fetchDashboard();

  }, []);


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="flex justify-center items-center py-20">

        <div className="text-lg font-semibold text-gray-600">

          Loading admin dashboard...

        </div>

      </div>

    );

  }


  // =====================================================
  // NO DATA
  // =====================================================

  if (!dashboard) {

    return (

      <div className="text-center py-20">

        <h2 className="text-xl font-semibold text-gray-700">

          Unable to load admin dashboard

        </h2>

      </div>

    );

  }


  const {
    stats,
    recentBookings,
  } = dashboard;


  return (

    <div className="space-y-10">


      {/* =================================================
          WELCOME
      ================================================= */}

      <div>

        <h1 className="text-4xl font-bold text-gray-800">

          Admin Dashboard 👋

        </h1>

        <p className="text-gray-500 mt-2">

          Manage your fitness platform from here.

        </p>

      </div>



      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">


        {/* USERS */}

        <div className="bg-blue-600 text-white rounded-xl shadow p-6">

          <FaUsers className="text-3xl mb-4" />

          <p className="text-sm">

            Total Users

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {stats.totalUsers}

          </h2>

        </div>



        {/* TRAINERS */}

        <div className="bg-green-600 text-white rounded-xl shadow p-6">

          <FaUserTie className="text-3xl mb-4" />

          <p className="text-sm">

            Total Trainers

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {stats.totalTrainers}

          </h2>

        </div>



        {/* CLASSES */}

        <div className="bg-purple-600 text-white rounded-xl shadow p-6">

          <FaBookOpen className="text-3xl mb-4" />

          <p className="text-sm">

            Total Classes

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {stats.totalClasses}

          </h2>

        </div>



        {/* BOOKINGS */}

        <div className="bg-orange-500 text-white rounded-xl shadow p-6">

          <FaClipboardList className="text-3xl mb-4" />

          <p className="text-sm">

            Total Bookings

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {stats.totalBookings}

          </h2>

        </div>


      </div>



      {/* =================================================
          SECOND ROW
      ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">


        {/* REVENUE */}

        <div className="bg-white rounded-xl shadow p-6 border">

          <FaRupeeSign className="text-3xl text-green-600 mb-4" />

          <p className="text-sm text-gray-500">

            Total Revenue

          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">

            ₹{stats.totalRevenue}

          </h2>

        </div>



        {/* PAID BOOKINGS */}

        <div className="bg-white rounded-xl shadow p-6 border">

          <FaClipboardList className="text-3xl text-blue-600 mb-4" />

          <p className="text-sm text-gray-500">

            Paid Bookings

          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">

            {stats.paidBookings}

          </h2>

        </div>



        {/* FEEDBACK */}

        <div className="bg-white rounded-xl shadow p-6 border">

          <FaStar className="text-3xl text-yellow-500 mb-4" />

          <p className="text-sm text-gray-500">

            Total Feedback

          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">

            {stats.totalFeedback}

          </h2>

        </div>



        {/* TODAY */}

        <div className="bg-white rounded-xl shadow p-6 border">

          <FaCalendarDay className="text-3xl text-purple-600 mb-4" />

          <p className="text-sm text-gray-500">

            Today's Bookings

          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">

            {stats.todayBookings}

          </h2>

        </div>


      </div>



      {/* =================================================
          RECENT BOOKINGS
      ================================================= */}

      <div>

        <div className="mb-6">

          <h2 className="text-2xl font-bold text-gray-800">

            Recent Bookings

          </h2>

          <p className="text-gray-500 mt-1">

            Latest bookings from users

          </p>

        </div>


        <div className="bg-white rounded-xl shadow overflow-hidden">


          {recentBookings?.length === 0 ? (

            <div className="p-8 text-center">

              <p className="text-gray-500">

                No bookings found

              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="text-left p-4">
                      User
                    </th>

                    <th className="text-left p-4">
                      Class
                    </th>

                    <th className="text-left p-4">
                      Trainer
                    </th>

                    <th className="text-left p-4">
                      Payment
                    </th>

                    <th className="text-left p-4">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {recentBookings.map(
                    (booking) => (

                      <tr
                        key={booking._id}
                        className="border-t hover:bg-gray-50"
                      >

                        {/* USER */}

                        <td className="p-4">

                          <div>

                            <p className="font-semibold text-gray-800">

                              {booking.user?.name ||
                                "Unknown User"}

                            </p>

                            <p className="text-sm text-gray-500">

                              {booking.user?.email ||
                                ""}

                            </p>

                          </div>

                        </td>


                        {/* CLASS */}

                        <td className="p-4">

                          <p className="font-medium">

                            {booking.class?.title ||
                              "Fitness Class"}

                          </p>

                        </td>


                        {/* TRAINER */}

                        <td className="p-4">

                          {booking.trainer?.name ||
                            "Unknown Trainer"}

                        </td>


                        {/* PAYMENT */}

                        <td className="p-4">

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              booking.paymentStatus ===
                              "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >

                            {booking.paymentStatus}

                          </span>

                        </td>


                        {/* STATUS */}

                        <td className="p-4">

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
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

                            {booking.bookingStatus}

                          </span>

                        </td>

                      </tr>

                    )
                  )}

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