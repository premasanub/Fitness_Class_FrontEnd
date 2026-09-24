// import { useEffect, useState } from "react";
// import api from "../../Service/api";

// function TrainerSchedule() {
//   const [schedules, setSchedules] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   const [newSchedule, setNewSchedule] = useState({
//     className: "",
//     day: "",
//     time: "",
//     duration: "",
//     seats: "",
//   });

//   const storedUser =
//     JSON.parse(localStorage.getItem("user") || "null") ||
//     JSON.parse(localStorage.getItem("trainer") || "null") ||
//     JSON.parse(localStorage.getItem("userData") || "null");

//   const trainerId =
//     storedUser?._id ||
//     storedUser?.id ||
//     localStorage.getItem("userId");

//   const fetchSchedules = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       if (!trainerId) {
//         setError(
//           "Trainer information not found. Please login again."
//         );
//         return;
//       }

//       const response = await api.get(
//         `/trainers/schedule/${trainerId}`
//       );

//       if (response.data?.success) {
//         setSchedules(response.data.schedules || []);
//       } else {
//         setError(
//           response.data?.message ||
//             "Failed to load schedules"
//         );
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Failed to load schedules"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSchedules();
//   }, [trainerId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setNewSchedule((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const addSchedule = async (e) => {
//     e.preventDefault();

//     if (!trainerId) {
//       setError(
//         "Trainer information not found. Please login again."
//       );
//       return;
//     }

//     try {
//       setSaving(true);
//       setError("");

//       const response = await api.post(
//         `/trainers/schedule/${trainerId}`,
//         newSchedule
//       );

//       if (response.data?.success) {
//         setSchedules((prev) => [
//           response.data.schedule,
//           ...prev,
//         ]);

//         setNewSchedule({
//           className: "",
//           day: "",
//           time: "",
//           duration: "",
//           seats: "",
//         });

//         setShowForm(false);
//       } else {
//         setError(
//           response.data?.message ||
//             "Failed to add schedule"
//         );
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Failed to add schedule"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const deleteSchedule = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this schedule?"
//     );

//     if (!confirmDelete) return;

//     try {
//       setError("");

//       await api.delete(
//         `/trainers/schedule/${trainerId}/${id}`
//       );

//       setSchedules((prev) =>
//         prev.filter((item) => item._id !== id)
//       );
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Failed to delete schedule"
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen p-8 flex items-center justify-center">
//         <div className="p-8 flex flex-col items-center gap-3">
//           <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />

//           <p className="text-gray-600 font-medium">
//             Loading schedule...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const inputClass =
//     "w-full border border-gray-300 rounded-lg min-h-11 px-4 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition";

//   return (
//     <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col gap-8">
//       {/* HEADER */}
//       <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div className="flex flex-col gap-2">
//           <h1 className="text-3xl font-bold text-gray-800">
//             My Schedule
//           </h1>

//           <p className="text-gray-500">
//             Manage your fitness class schedule.
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={() => {
//             setShowForm((prev) => !prev);
//             setError("");
//           }}
//           className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
//         >
//           {showForm ? "Close Form" : "+ Add New Schedule"}
//         </button>
//       </section>

//       {/* ERROR */}
//       {error && (
//         <div className="w-full p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl">
//           {error}
//         </div>
//       )}

//       {/* ADD FORM */}
//       {showForm && (
//         <form
//           onSubmit={addSchedule}
//           className="bg-white shadow-lg rounded-xl border border-gray-100 p-5 sm:p-6 lg:p-8 flex flex-col gap-6"
//         >
//           <div className="flex flex-col gap-1">
//             <h2 className="text-xl font-bold text-gray-800">
//               Add New Schedule
//             </h2>

//             <p className="text-sm text-gray-500">
//               Create a new fitness class schedule.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="className"
//                 className="font-semibold text-gray-700"
//               >
//                 Class Name
//               </label>

//               <input
//                 id="className"
//                 type="text"
//                 name="className"
//                 placeholder="Enter class name"
//                 value={newSchedule.className}
//                 onChange={handleChange}
//                 className={inputClass}
//                 required
//               />
//             </div>

//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="day"
//                 className="font-semibold text-gray-700"
//               >
//                 Day
//               </label>

//               <select
//                 id="day"
//                 name="day"
//                 value={newSchedule.day}
//                 onChange={handleChange}
//                 className={inputClass}
//                 required
//               >
//                 <option value="">Select Day</option>
//                 <option value="Monday">Monday</option>
//                 <option value="Tuesday">Tuesday</option>
//                 <option value="Wednesday">Wednesday</option>
//                 <option value="Thursday">Thursday</option>
//                 <option value="Friday">Friday</option>
//                 <option value="Saturday">Saturday</option>
//                 <option value="Sunday">Sunday</option>
//               </select>
//             </div>

//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="time"
//                 className="font-semibold text-gray-700"
//               >
//                 Time
//               </label>

//               <input
//                 id="time"
//                 type="text"
//                 name="time"
//                 placeholder="Example: 7:00 AM - 8:00 AM"
//                 value={newSchedule.time}
//                 onChange={handleChange}
//                 className={inputClass}
//                 required
//               />
//             </div>

//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="duration"
//                 className="font-semibold text-gray-700"
//               >
//                 Duration
//               </label>

//               <input
//                 id="duration"
//                 type="text"
//                 name="duration"
//                 placeholder="Example: 60 mins"
//                 value={newSchedule.duration}
//                 onChange={handleChange}
//                 className={inputClass}
//                 required
//               />
//             </div>

//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="seats"
//                 className="font-semibold text-gray-700"
//               >
//                 Maximum Seats
//               </label>

//               <input
//                 id="seats"
//                 type="number"
//                 name="seats"
//                 placeholder="Enter maximum seats"
//                 value={newSchedule.seats}
//                 onChange={handleChange}
//                 className={inputClass}
//                 min="1"
//                 required
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={saving}
//             className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition"
//           >
//             {saving ? "Saving..." : "Save Schedule"}
//           </button>
//         </form>
//       )}

//       {/* NO SCHEDULE */}
//       {schedules.length === 0 ? (
//         <div className="bg-white shadow rounded-xl p-8 min-h-48 flex flex-col items-center justify-center text-center gap-2">
//           <h2 className="text-xl font-semibold text-gray-700">
//             No Schedules Found
//           </h2>

//           <p className="text-gray-500">
//             Add your first fitness class schedule.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {schedules.map((item) => (
//             <article
//               key={item._id}
//               className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 flex flex-col gap-5"
//             >
//               <div className="flex flex-col gap-4">
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex flex-col gap-2">
//                     <h2 className="text-2xl font-bold text-gray-800">
//                       {item.title ||
//                         item.className ||
//                         "Fitness Class"}
//                     </h2>

//                     <span className="text-sm font-semibold text-blue-600">
//                       {item.category || "Fitness"}
//                     </span>
//                   </div>

//                   <span className="bg-green-100 text-green-700 rounded-full text-sm font-semibold px-4 py-1.5">
//                     Active
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-600">
//                   <div className="flex flex-col gap-1">
//                     <span className="text-sm font-semibold text-gray-400">
//                       Day
//                     </span>
//                     <span className="font-medium">
//                       {item.day ||
//                         item.date ||
//                         "Not Available"}
//                     </span>
//                   </div>

//                   <div className="flex flex-col gap-1">
//                     <span className="text-sm font-semibold text-gray-400">
//                       Time
//                     </span>
//                     <span className="font-medium">
//                       {item.time || "Not Available"}
//                     </span>
//                   </div>

//                   <div className="flex flex-col gap-1">
//                     <span className="text-sm font-semibold text-gray-400">
//                       Duration
//                     </span>
//                     <span className="font-medium">
//                       {item.duration || "Not Available"}
//                     </span>
//                   </div>

//                   <div className="flex flex-col gap-1">
//                     <span className="text-sm font-semibold text-gray-400">
//                       Maximum Seats
//                     </span>
//                     <span className="font-medium">
//                       {item.seats ?? 0}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <div className="flex flex-col gap-1">
//                   <span className="text-sm text-gray-400">
//                     Students Booked
//                   </span>

//                   <span className="font-bold text-gray-800">
//                     {item.studentsBooked ??
//                       item.bookedSeats ??
//                       0}
//                   </span>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => deleteSchedule(item._id)}
//                   className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </article>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default TrainerSchedule;

import { useEffect, useState } from "react";
import api from "../../Service/api";

function TrainerSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [newSchedule, setNewSchedule] = useState({
    className: "",
    day: "",
    time: "",
    duration: "",
    seats: "",
  });

  // ==================================================
  // GET TRAINER
  // ==================================================

  const storedUser =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(localStorage.getItem("trainer") || "null") ||
    JSON.parse(localStorage.getItem("userData") || "null");

  const trainerId =
    storedUser?._id ||
    storedUser?.id ||
    localStorage.getItem("userId");

  // ==================================================
  // FETCH SCHEDULES
  // ==================================================

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

      if (response.data?.success) {
        setSchedules(
          response.data.schedules || []
        );
      } else {
        setError(
          response.data?.message ||
            "Failed to load schedules"
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

  // ==================================================
  // HANDLE INPUT
  // ==================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewSchedule((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==================================================
  // RESET FORM
  // ==================================================

  const resetForm = () => {
    setNewSchedule({
      className: "",
      day: "",
      time: "",
      duration: "",
      seats: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // ==================================================
  // ADD / UPDATE SCHEDULE
  // ==================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!trainerId) {
      setError(
        "Trainer information not found. Please login again."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      // ==================================================
      // UPDATE
      // ==================================================

      if (editingId) {
        const response = await api.put(
          `/trainers/schedule/${trainerId}/${editingId}`,
          newSchedule
        );

        if (response.data?.success) {
          setSchedules((prev) =>
            prev.map((item) =>
              item._id === editingId
                ? response.data.schedule
                : item
            )
          );

          resetForm();
        } else {
          setError(
            response.data?.message ||
              "Failed to update schedule"
          );
        }

        return;
      }

      // ==================================================
      // CREATE
      // ==================================================

      const response = await api.post(
        `/trainers/schedule/${trainerId}`,
        newSchedule
      );

      if (response.data?.success) {
        const newScheduleData =
          response.data.schedule;

        setSchedules((prev) => [
          newScheduleData,
          ...prev,
        ]);

        resetForm();
      } else {
        setError(
          response.data?.message ||
            "Failed to add schedule"
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save schedule"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==================================================
  // EDIT SCHEDULE
  // ==================================================

  const handleEdit = (item) => {
    setEditingId(item._id);

    setNewSchedule({
      className:
        item.title ||
        item.className ||
        "",

      day:
        item.day ||
        item.date ||
        "",

      time:
        item.time ||
        item.timeSlots?.[0] ||
        "",

      duration:
        item.duration || "",

      seats:
        item.seats ?? "",
    });

    setShowForm(true);
    setError("");
  };

  // ==================================================
  // DELETE
  // ==================================================

  const deleteSchedule = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this schedule?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      await api.delete(
        `/trainers/schedule/${trainerId}/${id}`
      );

      setSchedules((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete schedule"
      );
    }
  };

  // ==================================================
  // LOADING
  // ==================================================

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

  // ==================================================
  // INPUT STYLE
  // ==================================================

  const inputClass =
    "w-full border border-gray-300 rounded-lg min-h-11 px-4 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition";

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col gap-8">

      {/* ==================================================
          HEADER
      ================================================== */}

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
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
              setError("");
            }
          }}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {showForm
            ? "Close Form"
            : "+ Add New Schedule"}
        </button>

      </section>

      {/* ==================================================
          ERROR
      ================================================== */}

      {error && (
        <div className="w-full p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl">
          {error}
        </div>
      )}

      {/* ==================================================
          ADD / UPDATE FORM
      ================================================== */}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl border border-gray-100 p-5 sm:p-6 lg:p-8 flex flex-col gap-6"
        >

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-gray-800">
              {editingId
                ? "Update Schedule"
                : "Add New Schedule"}
            </h2>

            <p className="text-sm text-gray-500">
              {editingId
                ? "Update your fitness class schedule."
                : "Create a new fitness class schedule."}
            </p>
          </div>

          {/* FORM GRID */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* CLASS NAME */}

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
                className={inputClass}
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
                className={inputClass}
                required
              >
                <option value="">
                  Select Day
                </option>

                <option value="Monday">
                  Monday
                </option>

                <option value="Tuesday">
                  Tuesday
                </option>

                <option value="Wednesday">
                  Wednesday
                </option>

                <option value="Thursday">
                  Thursday
                </option>

                <option value="Friday">
                  Friday
                </option>

                <option value="Saturday">
                  Saturday
                </option>

                <option value="Sunday">
                  Sunday
                </option>
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
                className={inputClass}
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
                className={inputClass}
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
                className={inputClass}
                min="1"
                required
              />
            </div>
          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={saving}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition"
          >
            {saving
              ? "Saving..."
              : editingId
              ? "Update Schedule"
              : "Save Schedule"}
          </button>

        </form>
      )}

      {/* ==================================================
          NO SCHEDULE
      ================================================== */}

      {schedules.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-8 min-h-48 flex flex-col items-center justify-center text-center gap-2">

          <h2 className="text-xl font-semibold text-gray-700">
            No Schedules Found
          </h2>

          <p className="text-gray-500">
            Add your first fitness class schedule.
          </p>

        </div>
      ) : (

        /* ==================================================
           SCHEDULE CARDS
        ================================================== */

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {schedules.map((item) => {

            const maximumSeats =
              Number(item.seats ?? 0);

            const studentsBooked =
              Number(
                item.studentsBooked ??
                item.bookedSeats ??
                0
              );

            const remainingSeats =
              Math.max(
                maximumSeats - studentsBooked,
                0
              );

            return (
              <article
                key={item._id}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 flex flex-col gap-5"
              >

                {/* TOP */}

                <div className="flex flex-col gap-4">

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex flex-col gap-2">

                      <h2 className="text-2xl font-bold text-gray-800">
                        {item.title ||
                          item.className ||
                          "Fitness Class"}
                      </h2>

                      <span className="text-sm font-semibold text-blue-600">
                        {item.category ||
                          "Fitness"}
                      </span>

                    </div>

                    <span className="bg-green-100 text-green-700 rounded-full text-sm font-semibold px-4 py-1.5">
                      Active
                    </span>

                  </div>

                  {/* INFORMATION */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-600">

                    {/* DAY */}

                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-gray-400">
                        Day
                      </span>

                      <span className="font-medium">
                        {item.day ||
                          item.date ||
                          "Not Available"}
                      </span>
                    </div>

                    {/* TIME */}

                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-gray-400">
                        Time
                      </span>

                      <span className="font-medium">
                        {item.time ||
                          item.timeSlots?.[0] ||
                          "Not Available"}
                      </span>
                    </div>

                    {/* DURATION */}

                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-gray-400">
                        Duration
                      </span>

                      <span className="font-medium">
                        {item.duration ||
                          "Not Available"}
                      </span>
                    </div>

                    {/* MAXIMUM SEATS */}

                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-gray-400">
                        Maximum Seats
                      </span>

                      <span className="font-bold text-blue-600">
                        {maximumSeats}
                      </span>
                    </div>

                    {/* STUDENTS BOOKED */}

                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-gray-400">
                        Students Booked
                      </span>

                      <span className="font-bold text-green-600">
                        {studentsBooked}
                      </span>
                    </div>

                    {/* REMAINING */}

                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-gray-400">
                        Seats Remaining
                      </span>

                      <span
                        className={`font-bold ${
                          remainingSeats > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {remainingSeats}
                      </span>
                    </div>

                  </div>
                </div>

                {/* BOTTOM */}

                <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">
                      Booking Status
                    </span>

                    <span className="font-bold text-gray-800">
                      {studentsBooked} /{" "}
                      {maximumSeats} booked
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">

                    {/* UPDATE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(item)
                      }
                      className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Update
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        deleteSchedule(
                          item._id
                        )
                      }
                      className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </article>
            );
          })}

        </div>
      )}
    </div>
  );
}

export default TrainerSchedule;