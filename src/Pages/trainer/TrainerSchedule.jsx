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


  // ==========================================
  // GET TRAINER ID
  // ==========================================

  const storedUser =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("trainer")) ||
    JSON.parse(localStorage.getItem("userData"));

  const trainerId =
    storedUser?._id ||
    storedUser?.id ||
    localStorage.getItem("userId");


  // ==========================================
  // FETCH SCHEDULES
  // ==========================================

  const fetchSchedules = async () => {
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
        `/trainers/schedule/${trainerId}`
      );

      if (response.data.success) {
        setSchedules(
          response.data.schedules || []
        );
      } else {
        setError(
          response.data.message ||
            "Failed to load schedules"
        );
      }

    } catch (err) {
      console.log(
        "Trainer Schedule Error:",
        err
      );

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


  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setNewSchedule({
      ...newSchedule,
      [e.target.name]: e.target.value,
    });
  };


  // ==========================================
  // ADD SCHEDULE
  // ==========================================

  const addSchedule = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const response = await api.post(
        `/trainers/schedule/${trainerId}`,
        newSchedule
      );

      if (response.data.success) {

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
      }

    } catch (err) {
      console.log(
        "Add Schedule Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to add schedule"
      );

    } finally {
      setSaving(false);
    }
  };


  // ==========================================
  // DELETE SCHEDULE
  // ==========================================

  const deleteSchedule = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this schedule?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/trainers/schedule/${trainerId}/${id}`
      );

      setSchedules((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

    } catch (err) {
      console.log(
        "Delete Schedule Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete schedule"
      );
    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">

        <p className="text-lg text-gray-600">
          Loading schedule...
        </p>

      </div>
    );
  }


  return (
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            My Schedule
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your fitness class schedule.
          </p>

        </div>


        <button
          onClick={() =>
            setShowForm(!showForm)
          }
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          {showForm
            ? "Close Form"
            : "+ Add New Schedule"}
        </button>

      </div>


      {/* ERROR */}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6">
          {error}
        </div>
      )}


      {/* ADD FORM */}

      {showForm && (

        <form
          onSubmit={addSchedule}
          className="bg-white shadow-lg rounded-xl p-6 mb-8 space-y-4"
        >

          <h2 className="text-xl font-bold text-gray-800">
            Add New Schedule
          </h2>


          {/* CLASS */}

          <input
            type="text"
            name="className"
            placeholder="Class Name"
            value={newSchedule.className}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />


          {/* DAY */}

          <select
            name="day"
            value={newSchedule.day}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >

            <option value="">
              Select Day
            </option>

            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>

          </select>


          {/* TIME */}

          <input
            type="text"
            name="time"
            placeholder="Example: 7:00 AM - 8:00 AM"
            value={newSchedule.time}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />


          {/* DURATION */}

          <input
            type="text"
            name="duration"
            placeholder="Example: 60 mins"
            value={newSchedule.duration}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />


          {/* SEATS */}

          <input
            type="number"
            name="seats"
            placeholder="Maximum Seats"
            value={newSchedule.seats}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            min="1"
            required
          />


          {/* SAVE */}

          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            {saving
              ? "Saving..."
              : "Save Schedule"}
          </button>

        </form>

      )}


      {/* NO SCHEDULE */}

      {schedules.length === 0 ? (

        <div className="bg-white shadow rounded-xl p-10 text-center">

          <h2 className="text-xl font-semibold text-gray-700">
            No Schedules Found
          </h2>

          <p className="text-gray-500 mt-2">
            Add your first fitness class schedule.
          </p>

        </div>

      ) : (

        /* SCHEDULE LIST */

        <div className="space-y-6">

          {schedules.map((item) => (

            <div
              key={item._id}
              className="bg-white shadow-lg rounded-xl p-6"
            >

              <div className="flex flex-col md:flex-row md:justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    {item.title}
                  </h2>

                  <p className="mt-3">
                    <strong>Day:</strong>{" "}
                    {item.date}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {item.time}
                  </p>

                  <p>
                    <strong>Duration:</strong>{" "}
                    {item.duration}
                  </p>

                  <p>
                    <strong>Maximum Seats:</strong>{" "}
                    {item.seats}
                  </p>

                  <p>
                    <strong>Students Booked:</strong>{" "}
                    0
                  </p>

                </div>


                {/* ACTIONS */}

                <div className="flex items-start">

                  <button
                    onClick={() =>
                      deleteSchedule(item._id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default TrainerSchedule;