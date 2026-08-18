import { useEffect, useState } from "react";
import api from "../../Service/api";
import ScheduleCard from "../../Components/ScheduleCard";

function Schedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [type, setType] = useState("All");
  const [duration, setDuration] = useState("All");
  const [timeSlot, setTimeSlot] = useState("All");

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?._id) {
        console.log("User ID not found");
        return;
      }

      const response = await api.get(
        `/bookings/user/${user._id}`
      );

      console.log("SCHEDULE RESPONSE:", response.data);

      const confirmedBookings = response.data.filter(
        (booking) =>
          booking.bookingStatus === "Confirmed" &&
          booking.class
      );

      setScheduleData(confirmedBookings);

    } catch (error) {
      console.log(
        "SCHEDULE ERROR:",
        error.response?.data || error.message
      );
    }
  };

  const filteredSchedule = scheduleData.filter((item) => {

    // Safety check
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

    // selectedSlot safe check
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

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Class Schedule
      </h1>

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        {/* Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="All">All</option>
          <option value="Yoga">Yoga</option>
          <option value="Zumba">Zumba</option>
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
        </select>

        {/* Duration */}
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="All">All</option>
          <option value="30 mins">30 mins</option>
          <option value="45 mins">45 mins</option>
          <option value="60 mins">60 mins</option>
        </select>

        {/* Time Slot */}
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="All">All</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredSchedule.length > 0 ? (

          filteredSchedule.map((schedule) => (
            <ScheduleCard
              key={schedule._id}
              schedule={schedule}
            />
          ))

        ) : (

          <p className="text-gray-500 col-span-full text-center">
            No classes found for the selected filters.
          </p>

        )}

      </div>

    </div>
  );
}

export default Schedule;