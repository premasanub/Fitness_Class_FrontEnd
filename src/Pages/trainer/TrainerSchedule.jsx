import { useState } from "react";
import trainerScheduleData from "../../data/trainerScheduleData";

function TrainerSchedule() {
  const [schedules, setSchedules] = useState(trainerScheduleData);

  const [showForm, setShowForm] = useState(false);

  const [newSchedule, setNewSchedule] = useState({
    className: "",
    day: "",
    time: "",
    duration: "",
    seats: "",
  });

  const handleChange = (e) => {
    setNewSchedule({
      ...newSchedule,
      [e.target.name]: e.target.value,
    });
  };

  const addSchedule = (e) => {
    e.preventDefault();

    const schedule = {
      id: schedules.length + 1,
      ...newSchedule,
      students: 0,
    };

    setSchedules([...schedules, schedule]);

    setNewSchedule({
      className: "",
      day: "",
      time: "",
      duration: "",
      seats: "",
    });

    setShowForm(false);
  };

  const deleteSchedule = (id) => {
    setSchedules(
      schedules.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="max-w-6xl mx-auto">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          My Schedule
        </h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add New Schedule
        </button>

      </div>

      {showForm && (
        <form
          onSubmit={addSchedule}
          className="bg-white shadow-lg rounded-xl p-6 mb-8 space-y-4"
        >

          <input
            type="text"
            name="className"
            placeholder="Class Name"
            value={newSchedule.className}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <select
            name="day"
            value={newSchedule.day}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">Select Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>

          <input
            type="text"
            name="time"
            placeholder="Time (Example: 7:00 AM - 8:00 AM)"
            value={newSchedule.time}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (Example: 60 mins)"
            value={newSchedule.duration}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="seats"
            placeholder="Maximum Seats"
            value={newSchedule.seats}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Save Schedule
          </button>

        </form>
      )}

      <div className="space-y-6">

        {schedules.map((item) => (

          <div
            key={item.id}
            className="bg-white shadow-lg rounded-xl p-6"
          >

            <h2 className="text-2xl font-bold">
              {item.className}
            </h2>

            <p className="mt-2">
              <strong>Day:</strong> {item.day}
            </p>

            <p>
              <strong>Time:</strong> {item.time}
            </p>

            <p>
              <strong>Duration:</strong> {item.duration}
            </p>

            <p>
              <strong>Maximum Seats:</strong> {item.seats}
            </p>

            <p>
              <strong>Students Booked:</strong> {item.students}
            </p>

            <div className="flex gap-4 mt-5">

              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => deleteSchedule(item.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TrainerSchedule;