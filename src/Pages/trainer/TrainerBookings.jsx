

import { useEffect, useState } from "react";
import api from "../../Service/api";

const getStoredUser = () => {
  const keys = ["user", "trainer", "userData"];

  for (const key of keys) {
    try {
      const value = localStorage.getItem(key);

      if (value) {
        const parsed = JSON.parse(value);

        if (parsed) {
          return parsed;
        }
      }
    } catch {
      // Ignore invalid localStorage data
    }
  }

  return null;
};

function TrainerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUser = getStoredUser();

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
          setError(
            "Trainer information not found. Please login again."
          );
          return;
        }

        const response = await api.get(
          `/trainers/bookings/${trainerId}`
        );

        if (response.data?.success) {
          setBookings(response.data.bookings || []);
        } else {
          setError(
            response.data?.message ||
              "Failed to load bookings"
          );
        }
      } catch (err) {
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

  if (loading) {
    return (
      <div className="min-h-40 flex items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading bookings...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-32 bg-red-50 border border-red-200 text-red-600 rounded-xl flex flex-col justify-center gap-2">
        <h2 className="font-bold text-lg">
          Unable to load bookings
        </h2>

        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-800">
          My Bookings
        </h1>

        <p className="text-gray-500">
          View students who booked your fitness classes.
        </p>
      </div>

      {/* Empty State */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow min-h-64 flex flex-col items-center justify-center gap-3 text-center border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700">
            No Bookings Found
          </h2>

          <p className="text-gray-500">
            You don't have any bookings yet.
          </p>
        </div>
      ) : (
        /* Bookings */
        <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="h-12 text-center font-semibold">
                    Student
                  </th>

                  <th className="h-12 text-center font-semibold">
                    Class
                  </th>

                  <th className="h-12 text-center font-semibold">
                    Date
                  </th>

                  <th className="h-12 text-center font-semibold">
                    Time
                  </th>

                  <th className="h-12 text-center font-semibold">
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

                  const studentEmail =
                    item.user?.email ||
                    item.student?.email;

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
                    item.selectedSlot ||
                    "-";

                  const status =
                    item.status || "Confirmed";

                  const normalizedStatus =
                    status.toLowerCase();

                  return (
                    <tr
                      key={item._id || item.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="h-20 text-center">
                        <div className="flex flex-col gap-1 items-center">
                          <span className="font-semibold text-gray-800">
                            {student}
                          </span>

                          {studentEmail && (
                            <span className="text-sm text-gray-500 break-all">
                              {studentEmail}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="h-20 text-center text-gray-700">
                        {className}
                      </td>

                      <td className="h-20 text-center text-gray-700">
                        {date}
                      </td>

                      <td className="h-20 text-center text-gray-700">
                        {time}
                      </td>

                      <td className="h-20 text-center">
                        <span
                          className={`inline-flex min-h-8 items-center justify-center rounded-full text-sm font-semibold indent-3 pr-3 ${
                            normalizedStatus === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : normalizedStatus === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : normalizedStatus === "cancelled"
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