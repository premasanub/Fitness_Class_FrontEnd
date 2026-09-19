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

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/bookings");

      if (response.data?.success) {
        setBookings(response.data.bookings || []);
      } else {
        setBookings([]);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load bookings"
      );

      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 p-1">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 shrink-0 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
          <FaClipboardList className="text-2xl" />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Bookings
          </h1>

          <p className="text-gray-500">
            Manage all fitness class bookings
          </p>
        </div>
      </div>

      {/* Total */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col gap-2">
          <p className="text-gray-500 text-sm font-semibold">
            Total Bookings
          </p>

          <p className="text-3xl font-bold text-gray-800">
            {bookings.length}
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-48 p-6 flex items-center justify-center">
          <p className="text-gray-500 font-medium">
            Loading bookings...
          </p>
        </div>
      )}

      {/* Empty */}
      {!loading && bookings.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-64 p-8 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <FaClipboardList className="text-4xl text-gray-300" />
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-gray-700">
                No Bookings Found
              </h2>

              <p className="text-gray-500">
                No bookings are available.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {!loading && bookings.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    Student
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    Class
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    Trainer
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    Schedule
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    Payment
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
                  >
                    {/* Student */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        {booking.user?.profileImage ? (
                          <img
                            src={booking.user.profileImage}
                            alt={booking.user.name}
                            className="w-11 h-11 rounded-full object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <FaUser />
                          </div>
                        )}

                        <div className="flex flex-col gap-1 min-w-0">
                          <p className="font-semibold text-gray-800">
                            {booking.user?.name ||
                              "Unknown User"}
                          </p>

                          <p className="text-xs text-gray-400 break-all">
                            {booking.user?.email || ""}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Class */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <FaBookOpen className="text-purple-500 shrink-0" />

                        <div className="flex flex-col gap-1">
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

                    {/* Trainer */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <FaUserTie className="text-green-500 shrink-0" />

                        <span className="text-gray-700">
                          {booking.trainer?.name ||
                            "Not assigned"}
                        </span>
                      </div>
                    </td>

                    {/* Schedule */}
                    <td className="px-5 py-5">
                      <div className="flex flex-col gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-blue-500 shrink-0" />

                          <span>
                            {booking.class?.date || "-"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <FaClock className="text-purple-500 shrink-0" />

                          <span>
                            {booking.selectedSlot ||
                              booking.class?.time ||
                              "-"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Payment */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave
                          className={
                            booking.paymentStatus === "Paid"
                              ? "text-green-500"
                              : "text-orange-500"
                          }
                        />

                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                            booking.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {booking.paymentStatus || "Pending"}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${
                          booking.bookingStatus === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.bookingStatus === "Completed"
                            ? "bg-blue-100 text-blue-700"
                            : booking.bookingStatus === "Cancelled"
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
        </div>
      )}
    </div>
  );
}

export default AdminBookings;