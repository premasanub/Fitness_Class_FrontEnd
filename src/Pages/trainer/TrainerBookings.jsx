import { useEffect, useState } from "react";
import api from "../../Service/api";

function TrainerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get logged-in trainer
  const storedUser =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("trainer")) ||
    JSON.parse(localStorage.getItem("userData"));

  const trainerId =
    storedUser?._id ||
    storedUser?.id ||
    localStorage.getItem("userId");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        if (!trainerId) {
          setError("Trainer information not found. Please login again.");
          return;
        }

        const response = await api.get(
          `/trainers/bookings/${trainerId}`
        );

        if (response.data.success) {
          setBookings(response.data.bookings || []);
        } else {
          setError(
            response.data.message || "Failed to load bookings"
          );
        }
      } catch (err) {
        console.log("Trainer Bookings Error:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [trainerId]);


  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg text-gray-600">
          Loading bookings...
        </p>
      </div>
    );
  }


  // ==============================
  // ERROR
  // ==============================

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-6">
        <h2 className="font-bold text-lg">
          Unable to load bookings
        </h2>

        <p className="mt-2">
          {error}
        </p>
      </div>
    );
  }


  return (
    <div>

      {/* Page Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          My Bookings
        </h1>

        <p className="text-gray-500 mt-2">
          View students who booked your fitness classes.
        </p>

      </div>


      {/* No Bookings */}

      {bookings.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-10 text-center">

          <h2 className="text-xl font-semibold text-gray-700">
            No Bookings Found
          </h2>

          <p className="text-gray-500 mt-2">
            You don't have any bookings yet.
          </p>

        </div>

      ) : (

        /* Bookings Table */

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="p-4">
                    Student
                  </th>

                  <th className="p-4">
                    Class
                  </th>

                  <th className="p-4">
                    Date
                  </th>

                  <th className="p-4">
                    Time
                  </th>

                  <th className="p-4">
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {bookings.map((item) => {

                  const student =
                    item.user?.name ||
                    item.student?.name ||
                    "Unknown Student";

                  const className =
                    item.class?.name ||
                    item.class?.title ||
                    item.class?.className ||
                    "Fitness Class";

                  const date =
                    item.date ||
                    item.bookingDate ||
                    "-";

                  const time =
                    item.time ||
                    item.slot ||
                    "-";

                  const status =
                    item.status ||
                    "Confirmed";

                  return (

                    <tr
                      key={item._id || item.id}
                      className="border-b text-center hover:bg-gray-50 transition"
                    >

                      {/* Student */}

                      <td className="p-4">

                        <div className="font-semibold text-gray-800">
                          {student}
                        </div>

                        {item.user?.email && (
                          <div className="text-sm text-gray-500">
                            {item.user.email}
                          </div>
                        )}

                      </td>


                      {/* Class */}

                      <td className="p-4 text-gray-700">
                        {className}
                      </td>


                      {/* Date */}

                      <td className="p-4 text-gray-700">
                        {date}
                      </td>


                      {/* Time */}

                      <td className="p-4 text-gray-700">
                        {time}
                      </td>


                      {/* Status */}

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            status.toLowerCase() === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : status.toLowerCase() === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : status.toLowerCase() === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {status}
                        </span>

                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}

export default TrainerBookings;