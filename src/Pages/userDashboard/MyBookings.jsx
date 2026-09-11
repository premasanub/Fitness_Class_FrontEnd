

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../Service/api";
import BookingCard from "../../Components/BookingCard";

const getStoredUser = () => {
  try {
    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);

        const user = getStoredUser();

        if (!user?._id) {
          toast.error(
            "User information not found. Please login again."
          );
          return;
        }

        const response = await api.get(
          `/bookings/user/${user._id}`
        );

        setBookings(
          Array.isArray(response.data)
            ? response.data
            : []
        );
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center flex flex-col gap-3">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <h2 className="text-xl font-semibold text-gray-700">
            Loading bookings...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          My Bookings
        </h1>

        <p className="text-gray-500">
          View and manage your fitness class bookings.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="min-h-56 bg-white rounded-xl shadow border border-gray-100 flex flex-col items-center justify-center gap-3 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No Bookings Found
          </h2>

          <p className="text-gray-500">
            You haven't booked any fitness classes yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;