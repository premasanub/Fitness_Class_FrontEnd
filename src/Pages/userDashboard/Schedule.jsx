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

  const filteredSchedule = scheduleData.filter((item) => {
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

    return matchType && matchDuration && matchTime;
  });

  if (loading) {
    return (
      <div className="min-h-40 flex items-center justify-center">
        <p className="text-gray-600 font-semibold">
          Loading schedule...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-32 bg-red-50 border border-red-200 rounded-xl text-red-600 flex flex-col justify-center gap-2">
        <h2 className="font-bold text-lg">
          Unable to load schedule
        </h2>

        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {/* HEADER */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">
          My Class Schedule
        </h1>

        <p className="text-gray-500">
          View and filter your confirmed fitness classes.
        </p>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full h-11 border border-gray-300 rounded-lg bg-white indent-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All Types</option>
          <option value="Yoga">Yoga</option>
          <option value="Zumba">Zumba</option>
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
        </select>

        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full h-11 border border-gray-300 rounded-lg bg-white indent-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All Durations</option>
          <option value="30 mins">30 mins</option>
          <option value="45 mins">45 mins</option>
          <option value="60 mins">60 mins</option>
        </select>

        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="w-full h-11 border border-gray-300 rounded-lg bg-white indent-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All Time Slots</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
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
        <div className="min-h-48 bg-white border border-gray-100 rounded-xl shadow flex flex-col items-center justify-center gap-3 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No Classes Found
          </h2>

          <p className="text-gray-500">
            No classes match the selected filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default Schedule;