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
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-5" />

          <h2 className="text-xl font-semibold text-gray-700">
            Loading bookings...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait while we load your bookings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            My Bookings
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage your fitness class bookings.
          </p>
        </div>

        {/* BOOKINGS */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 min-h-64 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <span className="text-blue-600 text-2xl">
                📅
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-700">
              No Bookings Found
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't booked any fitness classes
              yet.
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
    </div>
  );
}

export default MyBookings;