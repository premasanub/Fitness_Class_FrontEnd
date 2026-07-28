import { useState } from "react";
import scheduleData from "../../data/scheduleData";
import ScheduleCard from "../../Components/ScheduleCard";

function Schedule() {

  const [type, setType] = useState("All");
  const [duration, setDuration] = useState("All");
  const [timeSlot, setTimeSlot] = useState("All");

  const filteredSchedule = scheduleData.filter((item) => {

    const matchType =
      type === "All" || item.category === type;

    const matchDuration =
      duration === "All" || item.duration === duration;

    const matchTime =
      timeSlot === "All" || item.timeSlot === timeSlot;

    return matchType && matchDuration && matchTime;
  });

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Class Schedule
      </h1>

      {/* Filters */}

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option>All</option>
          <option>Yoga</option>
          <option>Zumba</option>
          <option>Cardio</option>
          <option>Strength</option>
        </select>

        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option>All</option>
          <option>30 mins</option>
          <option>45 mins</option>
          <option>60 mins</option>
        </select>

        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option>All</option>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
        </select>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredSchedule.map((schedule) => (

          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
          />

        ))}

      </div>

    </div>
  );
}

export default Schedule;