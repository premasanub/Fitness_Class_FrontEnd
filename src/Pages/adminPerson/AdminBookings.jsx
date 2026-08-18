import { useEffect, useState } from "react";

import {
  FaClipboardList,
  FaUser,
  FaUserTie,
  FaBookOpen,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

import { toast } from "react-toastify";

import api from "../../Service/api";


function AdminBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  // =====================================================
  // FETCH BOOKINGS
  // =====================================================

  const fetchBookings = async () => {

    try {

      setLoading(true);

      const response = await api.get(
        "/admin/bookings"
      );

      if (response.data.success) {

        setBookings(
          response.data.bookings || []
        );

      }

    } catch (error) {

      console.log(
        "Fetch Admin Bookings Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to load bookings"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchBookings();

  }, []);


  return (

    <div className="space-y-8">


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div>

        <div className="flex items-center gap-3">

          <div className="bg-orange-100 text-orange-600 p-3 rounded-xl">

            <FaClipboardList className="text-2xl" />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Bookings
            </h1>

            <p className="text-gray-500 mt-1">
              Manage all fitness class bookings
            </p>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* TOTAL BOOKINGS */}
      {/* ================================================= */}

      <div className="bg-white rounded-xl shadow p-6">

        <p className="text-gray-500 text-sm font-semibold">
          Total Bookings
        </p>

        <p className="text-3xl font-bold text-gray-800 mt-2">
          {bookings.length}
        </p>

      </div>


      {/* ================================================= */}
      {/* LOADING */}
      {/* ================================================= */}

      {loading && (

        <div className="bg-white rounded-xl shadow p-10 text-center">

          <p className="text-gray-500">
            Loading bookings...
          </p>

        </div>

      )}


      {/* ================================================= */}
      {/* EMPTY */}
      {/* ================================================= */}

      {!loading && bookings.length === 0 && (

        <div className="bg-white rounded-xl shadow p-10 text-center">

          <FaClipboardList className="text-5xl text-gray-300 mx-auto mb-4" />

          <h2 className="text-xl font-semibold text-gray-700">
            No Bookings Found
          </h2>

          <p className="text-gray-500 mt-2">
            No bookings are available.
          </p>

        </div>

      )}


      {/* ================================================= */}
      {/* BOOKINGS TABLE */}
      {/* ================================================= */}

      {!loading && bookings.length > 0 && (

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 border-b">

                <tr>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Student
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Class
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Trainer
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Schedule
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Payment
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {bookings.map((booking) => (

                  <tr
                    key={booking._id}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition"
                  >


                    {/* ================================================= */}
                    {/* STUDENT */}
                    {/* ================================================= */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        {booking.user?.profileImage ? (

                          <img
                            src={booking.user.profileImage}
                            alt={booking.user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />

                        ) : (

                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">

                            <FaUser />

                          </div>

                        )}

                        <div>

                          <p className="font-semibold text-gray-800">
                            {booking.user?.name ||
                              "Unknown User"}
                          </p>

                          <p className="text-xs text-gray-400">
                            {booking.user?.email || ""}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* ================================================= */}
                    {/* CLASS */}
                    {/* ================================================= */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <FaBookOpen className="text-purple-500" />

                        <div>

                          <p className="font-semibold text-gray-800">
                            {booking.class?.title ||
                              "Unknown Class"}
                          </p>

                          <p className="text-xs text-gray-400">
                            {booking.class?.category || ""}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* ================================================= */}
                    {/* TRAINER */}
                    {/* ================================================= */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <FaUserTie className="text-green-500" />

                        <span className="text-gray-700">

                          {booking.trainer?.name ||
                            "Not assigned"}

                        </span>

                      </div>

                    </td>


                    {/* ================================================= */}
                    {/* SCHEDULE */}
                    {/* ================================================= */}

                    <td className="px-6 py-5">

                      <div className="space-y-2 text-sm text-gray-600">

                        <div className="flex items-center gap-2">

                          <FaCalendarAlt className="text-blue-500" />

                          <span>
                            {booking.class?.date || "-"}
                          </span>

                        </div>

                        <div className="flex items-center gap-2">

                          <FaClock className="text-purple-500" />

                          <span>
                            {booking.selectedSlot ||
                              booking.class?.time ||
                              "-"}
                          </span>

                        </div>

                      </div>

                    </td>


                    {/* ================================================= */}
                    {/* PAYMENT */}
                    {/* ================================================= */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <FaMoneyBillWave
                          className={
                            booking.paymentStatus === "Paid"
                              ? "text-green-500"
                              : "text-orange-500"
                          }
                        />

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {booking.paymentStatus ||
                            "Pending"}
                        </span>

                      </div>

                    </td>


                    {/* ================================================= */}
                    {/* BOOKING STATUS */}
                    {/* ================================================= */}

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
                        {booking.bookingStatus ||
                          "Pending"}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>

  );

}

export default AdminBookings;