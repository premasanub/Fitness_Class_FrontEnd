


import { useEffect, useState } from "react";
import api from "../../Service/api";

function TrainerSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [newSchedule, setNewSchedule] = useState({
    className: "",
    day: "",
    time: "",
    duration: "",
    seats: "",
  });

  const storedUser =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(localStorage.getItem("trainer") || "null") ||
    JSON.parse(localStorage.getItem("userData") || "null");

  const trainerId =
    storedUser?._id ||
    storedUser?.id ||
    localStorage.getItem("userId");

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      setError("");

      if (!trainerId) {
        setError("Trainer information not found. Please login again.");
        return;
      }

      const response = await api.get(
        `/trainers/schedule/${trainerId}`
      );

      if (response.data?.success) {
        setSchedules(response.data.schedules || []);
      } else {
        setError(
          response.data?.message || "Failed to load schedules"
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load schedules"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [trainerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewSchedule((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSchedule = async (e) => {
    e.preventDefault();

    if (!trainerId) {
      setError("Trainer information not found. Please login again.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await api.post(
        `/trainers/schedule/${trainerId}`,
        newSchedule
      );

      if (response.data?.success) {
        setSchedules((prev) => [
          response.data.schedule,
          ...prev,
        ]);

        setNewSchedule({
          className: "",
          day: "",
          time: "",
          duration: "",
          seats: "",
        });

        setShowForm(false);
      } else {
        setError(
          response.data?.message || "Failed to add schedule"
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to add schedule"
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteSchedule = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this schedule?"
    );

    if (!confirmDelete) return;

    try {
      setError("");

      await api.delete(
        `/trainers/schedule/${trainerId}/${id}`
      );

      setSchedules((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete schedule"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">
            Loading schedule...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
      {/* HEADER */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-800">
            My Schedule
          </h1>

          <p className="text-gray-500">
            Manage your fitness class schedule.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowForm((prev) => !prev);
            setError("");
          }}
          className="bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition min-h-11"
        >
          {showForm ? "Close Form" : "+ Add New Schedule"}
        </button>
      </section>

      {/* ERROR */}
      {error && (
        <div className="w-full bg-red-50 border border-red-200 text-red-600 rounded-xl min-h-12 flex items-center">
          <span>{error}</span>
        </div>
      )}

      {/* ADD FORM */}
      {showForm && (
        <form
          onSubmit={addSchedule}
          className="bg-white shadow-lg rounded-xl flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-gray-800">
              Add New Schedule
            </h2>

            <p className="text-sm text-gray-500">
              Create a new fitness class schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* CLASS */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="className"
                className="font-semibold text-gray-700"
              >
                Class Name
              </label>

              <input
                id="className"
                type="text"
                name="className"
                placeholder="Enter class name"
                value={newSchedule.className}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg min-h-11 outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* DAY */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="day"
                className="font-semibold text-gray-700"
              >
                Day
              </label>

              <select
                id="day"
                name="day"
                value={newSchedule.day}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg min-h-11 outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>

            {/* TIME */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="time"
                className="font-semibold text-gray-700"
              >
                Time
              </label>

              <input
                id="time"
                type="text"
                name="time"
                placeholder="Example: 7:00 AM - 8:00 AM"
                value={newSchedule.time}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg min-h-11 outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* DURATION */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="duration"
                className="font-semibold text-gray-700"
              >
                Duration
              </label>

              <input
                id="duration"
                type="text"
                name="duration"
                placeholder="Example: 60 mins"
                value={newSchedule.duration}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg min-h-11 outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* SEATS */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="seats"
                className="font-semibold text-gray-700"
              >
                Maximum Seats
              </label>

              <input
                id="seats"
                type="number"
                name="seats"
                placeholder="Enter maximum seats"
                value={newSchedule.seats}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg min-h-11 outline-none focus:border-blue-500"
                min="1"
                required
              />
            </div>
          </div>

          {/* SAVE */}
          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition min-h-11"
          >
            {saving ? "Saving..." : "Save Schedule"}
          </button>
        </form>
      )}

      {/* NO SCHEDULE */}
      {schedules.length === 0 ? (
        <div className="bg-white shadow rounded-xl min-h-48 flex flex-col items-center justify-center text-center gap-2">
          <h2 className="text-xl font-semibold text-gray-700">
            No Schedules Found
          </h2>

          <p className="text-gray-500">
            Add your first fitness class schedule.
          </p>
        </div>
      ) : (
        /* SCHEDULE LIST */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {schedules.map((item) => (
            <article
              key={item._id}
              className="bg-white shadow-lg rounded-xl flex flex-col gap-5 border border-gray-100"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {item.title || item.className || "Fitness Class"}
                    </h2>

                    <span className="text-sm font-semibold text-blue-600">
                      {item.category || "Fitness"}
                    </span>
                  </div>

                  <span className="bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-400">
                      Day
                    </span>
                    <span className="font-medium">
                      {item.day || item.date || "Not Available"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-400">
                      Time
                    </span>
                    <span className="font-medium">
                      {item.time || "Not Available"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-400">
                      Duration
                    </span>
                    <span className="font-medium">
                      {item.duration || "Not Available"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-400">
                      Maximum Seats
                    </span>
                    <span className="font-medium">
                      {item.seats ?? 0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-400">
                    Students Booked
                  </span>

                  <span className="font-bold text-gray-800">
                    {item.studentsBooked ?? item.bookedSeats ?? 0}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => deleteSchedule(item._id)}
                  className="bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition min-h-10"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrainerSchedule;