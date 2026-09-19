import { useEffect, useState } from "react";
import api from "../../Service/api";
import ScheduleCard from "../../Components/ScheduleCard";

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

function Schedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [type, setType] = useState("All");
  const [duration, setDuration] = useState("All");
  const [timeSlot, setTimeSlot] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        setError("");

        const user = getStoredUser();

        if (!user?._id) {
          setError(
            "User information not found. Please login again."
          );
          return;
        }

        const response = await api.get(
          `/bookings/user/${user._id}`
        );

        const bookings = Array.isArray(response.data)
          ? response.data
          : response.data?.bookings || [];

        const confirmedBookings = bookings.filter(
          (booking) =>
            booking.bookingStatus === "Confirmed" &&
            booking.class
        );

        setScheduleData(confirmedBookings);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load schedule"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const filteredSchedule = scheduleData.filter(
    (item) => {
      if (!item.class) {
        return false;
      }

      const matchType =
        type === "All" ||
        item.class.category?.toLowerCase() ===
          type.toLowerCase();

      const matchDuration =
        duration === "All" ||
        `${item.class.duration} mins` === duration;

      const selectedSlot = item.selectedSlot || "";

      const slot = selectedSlot.includes("AM")
        ? "Morning"
        : selectedSlot.includes("PM")
        ? "Evening"
        : "Afternoon";

      const matchTime =
        timeSlot === "All" || slot === timeSlot;

      return (
        matchType &&
        matchDuration &&
        matchTime
      );
    }
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-5" />

          <p className="text-gray-600 font-semibold">
            Loading schedule...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-2xl p-6">
          <h2 className="font-bold text-lg text-red-700">
            Unable to load schedule
          </h2>

          <p className="text-red-600 mt-2">
            {error}
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
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
            Schedule
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
            My Class Schedule
          </h1>

          <p className="text-gray-500 mt-2">
            View and filter your confirmed fitness classes.
          </p>
        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-8">
          <div className="mb-5">
            <h2 className="font-bold text-gray-900">
              Filter Schedule
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Choose your preferred class type, duration,
              or time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="w-full h-12 px-4 border border-gray-300 rounded-xl bg-white text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">
                All Types
              </option>

              <option value="Yoga">Yoga</option>
              <option value="Zumba">Zumba</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">
                Strength
              </option>
            </select>

            <select
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
              className="w-full h-12 px-4 border border-gray-300 rounded-xl bg-white text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">
                All Durations
              </option>

              <option value="30 mins">
                30 mins
              </option>

              <option value="45 mins">
                45 mins
              </option>

              <option value="60 mins">
                60 mins
              </option>
            </select>

            <select
              value={timeSlot}
              onChange={(e) =>
                setTimeSlot(e.target.value)
              }
              className="w-full h-12 px-4 border border-gray-300 rounded-xl bg-white text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">
                All Time Slots
              </option>

              <option value="Morning">
                Morning
              </option>

              <option value="Afternoon">
                Afternoon
              </option>

              <option value="Evening">
                Evening
              </option>
            </select>
          </div>
        </div>

        {/* SCHEDULE CARDS */}
        {filteredSchedule.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchedule.map((schedule) => (
              <ScheduleCard
                key={schedule._id}
                schedule={schedule}
              />
            ))}
          </div>
        ) : (
          <div className="min-h-56 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <span className="text-blue-600 text-2xl">
                📅
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-700">
              No Classes Found
            </h2>

            <p className="text-gray-500 mt-2">
              No classes match the selected filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Schedule;