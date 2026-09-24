// import { useEffect, useState } from "react";
// import {
//   useLocation,
//   useNavigate,
//   useParams,
// } from "react-router-dom";
// import api from "../../Service/api";

// import yoga from "../../assets/yoga.jpg";
// import zumba from "../../assets/zumba.jpg";
// import cardio from "../../assets/cardio.jpg";
// import strength from "../../assets/strength.jpg";

// function ClassDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const fromBookings =
//     location.state?.fromBookings || false;

//   const [selectedClass, setSelectedClass] =
//     useState(null);

//   const [booking, setBooking] = useState(null);
//   const [showSlots, setShowSlots] = useState(false);
//   const [selectedSlot, setSelectedSlot] =
//     useState("");

//   const [loading, setLoading] = useState(true);
//   const [changingSlot, setChangingSlot] =
//     useState(false);
//   const [error, setError] = useState("");

//   const classImages = {
//     "yoga.jpg": yoga,
//     "zumba.jpg": zumba,
//     "cardio.jpg": cardio,
//     "strength.jpg": strength,
//   };

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         if (fromBookings) {
//           const response = await api.get(
//             `/bookings/${id}`
//           );

//           const bookingData = response.data;

//           setBooking(bookingData);
//           setSelectedClass(
//             bookingData?.class || null
//           );
//         } else {
//           const response = await api.get(
//             `/classes/${id}`
//           );

//           setSelectedClass(
//             response.data?.class || response.data
//           );
//         }
//       } catch (error) {
//         setError(
//           error.response?.data?.message ||
//             "Unable to load class details."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [id, fromBookings]);

//   const getClassDateTime = () => {
//     if (!selectedClass?.date || !selectedClass?.time) {
//       return null;
//     }

//     let time = String(selectedClass.time).trim();

//     if (time.includes("-")) {
//       time = time.split("-")[0].trim();
//     }

//     let hours;
//     let minutes;

//     const amPmMatch = time.match(
//       /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
//     );

//     if (amPmMatch) {
//       hours = Number(amPmMatch[1]);
//       minutes = Number(amPmMatch[2]);

//       const period = amPmMatch[3].toUpperCase();

//       if (period === "PM" && hours !== 12) {
//         hours += 12;
//       }

//       if (period === "AM" && hours === 12) {
//         hours = 0;
//       }
//     } else {
//       const timeMatch = time.match(
//         /^(\d{1,2}):(\d{2})$/
//       );

//       if (!timeMatch) {
//         return null;
//       }

//       hours = Number(timeMatch[1]);
//       minutes = Number(timeMatch[2]);
//     }

//     const dateParts = String(selectedClass.date)
//       .split("-")
//       .map(Number);

//     if (dateParts.length !== 3) {
//       return null;
//     }

//     const [year, month, day] = dateParts;

//     return new Date(
//       year,
//       month - 1,
//       day,
//       hours,
//       minutes,
//       0,
//       0
//     );
//   };

//   const isBookingAllowed = () => {
//     const classDateTime = getClassDateTime();

//     if (!classDateTime) {
//       return false;
//     }

//     const hoursRemaining =
//       (classDateTime.getTime() - Date.now()) /
//       (1000 * 60 * 60);

//     return hoursRemaining >= 24;
//   };

//   const isChangeAllowed = () => {
//     const classDateTime = getClassDateTime();

//     if (!classDateTime) {
//       return false;
//     }

//     const hoursRemaining =
//       (classDateTime.getTime() - Date.now()) /
//       (1000 * 60 * 60);

//     return hoursRemaining > 24;
//   };

//   const handleChangeSlot = async () => {
//     if (!selectedSlot) {
//       return;
//     }

//     if (!isChangeAllowed()) {
//       return;
//     }

//     try {
//       setChangingSlot(true);

//       const response = await api.put(
//         `/bookings/change-slot/${booking._id}`,
//         {
//           selectedSlot,
//         }
//       );

//       setBooking(response.data.booking);

//       setShowSlots(false);
//       setSelectedSlot("");
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "Unable to change time slot"
//       );
//     } finally {
//       setChangingSlot(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
//         <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
//           <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-5" />

//           <h2 className="text-xl font-semibold text-gray-700">
//             Loading class details...
//           </h2>

//           <p className="text-gray-500 mt-2">
//             Please wait while we load the class.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !selectedClass) {
//     return (
//       <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
//         <div className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
//           <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-2xl font-bold">
//             !
//           </div>

//           <h2 className="text-2xl font-bold text-gray-900">
//             {error || "Class details not found"}
//           </h2>

//           <button
//             onClick={() =>
//               navigate("/dashboard/classes")
//             }
//             className="w-full min-h-12 mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
//           >
//             Back to Classes
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const seatsAvailable = Number(
//     selectedClass.seats || 0
//   );

//   const canBook =
//     seatsAvailable > 0 && isBookingAllowed();

//   const timeSlots = Array.isArray(
//     selectedClass.timeSlots
//   )
//     ? selectedClass.timeSlots
//     : [];

//   const canChange =
//     fromBookings && isChangeAllowed();

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
//       <div className="max-w-6xl mx-auto">

//         {/* IMAGE */}
//         <div className="relative overflow-hidden rounded-2xl shadow-lg mb-8">
//           <img
//             src={
//               classImages[selectedClass.image] ||
//               strength
//             }
//             alt={selectedClass.title}
//             className="w-full h-72 md:h-96 object-cover"
//           />

//           <div className="absolute top-5 left-5">
//             <span className="px-4 py-2 bg-white/95 rounded-full text-sm font-semibold text-blue-600 shadow">
//               {selectedClass.category ||
//                 "Fitness"}
//             </span>
//           </div>

//           <div className="absolute bottom-5 right-5 bg-white rounded-xl shadow-lg px-5 py-3">
//             <p className="text-xs text-gray-500">
//               Price
//             </p>

//             <p className="text-2xl font-bold text-blue-600">
//               ₹{selectedClass.price || 0}
//             </p>
//           </div>
//         </div>

//         {/* HEADER */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//             {selectedClass.title}
//           </h1>

//           <p className="text-gray-600 mt-3 leading-7 max-w-4xl">
//             {selectedClass.description ||
//               "Professional fitness class designed to help you reach your goals."}
//           </p>
//         </div>

//         {/* INFORMATION */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//           <DetailItem
//             label="Trainer"
//             value={
//               selectedClass.trainer?.name ||
//               booking?.trainer?.name ||
//               "Not Assigned"
//             }
//           />

//           <DetailItem
//             label="Category"
//             value={
//               selectedClass.category || "N/A"
//             }
//           />

//           <DetailItem
//             label="Date"
//             value={
//               selectedClass.date || "N/A"
//             }
//           />

//           <DetailItem
//             label="Time"
//             value={
//               selectedClass.time || "N/A"
//             }
//           />

//           <DetailItem
//             label="Duration"
//             value={`${selectedClass.duration || 0} mins`}
//           />

//           <DetailItem
//             label="Price"
//             value={`₹${selectedClass.price || 0}`}
//             highlight
//           />

//           <DetailItem
//             label="Seats Available"
//             value={seatsAvailable}
//             valueClass={
//               seatsAvailable > 0
//                 ? "text-green-600"
//                 : "text-red-600"
//             }
//           />

//           {booking && (
//             <DetailItem
//               label="Booked Slot"
//               value={
//                 booking.selectedSlot ||
//                 "Not Selected"
//               }
//               highlight
//             />
//           )}

//           {booking && (
//             <DetailItem
//               label="Booking Status"
//               value={
//                 booking.bookingStatus || "N/A"
//               }
//               valueClass="text-green-600"
//             />
//           )}
//         </div>

//         {/* BOOKING CONTENT */}
//         {fromBookings ? (
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
//             <div className="flex flex-col gap-5">

//               {selectedClass.meetingLink && (
//                 <a
//                   href={selectedClass.meetingLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-full min-h-12 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center"
//                 >
//                   Join Meeting
//                 </a>
//               )}

//               {canChange ? (
//                 !showSlots ? (
//                   <button
//                     onClick={() =>
//                       setShowSlots(true)
//                     }
//                     className="w-full min-h-12 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
//                   >
//                     Change Slot
//                   </button>
//                 ) : (
//                   <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6">
//                     <h2 className="text-xl font-bold text-gray-900 mb-5">
//                       Select New Time Slot
//                     </h2>

//                     {timeSlots.length === 0 ? (
//                       <p className="text-red-500">
//                         No time slots available.
//                       </p>
//                     ) : (
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         {timeSlots.map(
//                           (slot, index) => (
//                             <label
//                               key={`${slot}-${index}`}
//                               className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${
//                                 selectedSlot ===
//                                 slot
//                                   ? "border-blue-500 bg-blue-50"
//                                   : "border-gray-200 bg-white hover:border-blue-300"
//                               }`}
//                             >
//                               <input
//                                 type="radio"
//                                 name="newSlot"
//                                 value={slot}
//                                 checked={
//                                   selectedSlot ===
//                                   slot
//                                 }
//                                 onChange={(e) =>
//                                   setSelectedSlot(
//                                     e.target.value
//                                   )
//                                 }
//                                 className="w-5 h-5 accent-blue-600"
//                               />

//                               <span className="font-semibold text-gray-800">
//                                 {slot}
//                               </span>
//                             </label>
//                           )
//                         )}
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
//                       <button
//                         onClick={
//                           handleChangeSlot
//                         }
//                         disabled={
//                           !selectedSlot ||
//                           changingSlot
//                         }
//                         className={`min-h-12 px-6 py-3 rounded-xl text-white font-semibold transition ${
//                           selectedSlot &&
//                           !changingSlot
//                             ? "bg-green-600 hover:bg-green-700"
//                             : "bg-gray-300 cursor-not-allowed"
//                         }`}
//                       >
//                         {changingSlot
//                           ? "Changing..."
//                           : "Confirm New Slot"}
//                       </button>

//                       <button
//                         onClick={() => {
//                           setShowSlots(false);
//                           setSelectedSlot("");
//                         }}
//                         className="min-h-12 px-6 py-3 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 transition"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 )
//               ) : (
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-5">
//                   <h3 className="text-lg font-bold text-red-600">
//                     Schedule Cannot Be Changed
//                   </h3>

//                   <p className="text-red-500 mt-1">
//                     Time slot changes are allowed
//                     only before 24 hours of the
//                     class.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
//             {seatsAvailable <= 0 ? (
//               <div className="flex flex-col gap-5">
//                 <StatusMessage
//                   title="Class Full"
//                   message="Sorry, there are no available seats for this class."
//                 />

//                 <button
//                   disabled
//                   className="w-full min-h-12 px-6 py-3 bg-gray-300 text-gray-500 rounded-xl cursor-not-allowed font-semibold"
//                 >
//                   No Seats Available
//                 </button>
//               </div>
//             ) : !isBookingAllowed() ? (
//               <div className="flex flex-col gap-5">
//                 <StatusMessage
//                   title="Booking Closed"
//                   message="Booking is allowed only when the class is at least 24 hours away."
//                 />

//                 <button
//                   disabled
//                   className="w-full min-h-12 px-6 py-3 bg-gray-300 text-gray-500 rounded-xl cursor-not-allowed font-semibold"
//                 >
//                   Booking Closed
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => {
//                   if (canBook) {
//                     navigate(
//                       `/dashboard/booking/${selectedClass._id}`
//                     );
//                   }
//                 }}
//                 disabled={!canBook}
//                 className={`w-full min-h-12 px-6 py-3 rounded-xl text-white font-semibold transition ${
//                   canBook
//                     ? "bg-green-600 hover:bg-green-700"
//                     : "bg-gray-300 cursor-not-allowed"
//                 }`}
//               >
//                 Book Now
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function DetailItem({
//   label,
//   value,
//   highlight,
//   valueClass = "",
// }) {
//   return (
//     <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
//       <p className="text-sm text-gray-500 mb-2">
//         {label}
//       </p>

//       <p
//         className={`font-semibold ${
//           highlight
//             ? "text-blue-600"
//             : valueClass || "text-gray-800"
//         }`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }

// function StatusMessage({ title, message }) {
//   return (
//     <div className="bg-red-50 border border-red-200 rounded-xl p-5">
//       <h3 className="text-lg font-bold text-red-600">
//         {title}
//       </h3>

//       <p className="text-red-500 mt-1">
//         {message}
//       </p>
//     </div>
//   );
// }

// export default ClassDetails;


import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import api from "../../Service/api";

import yoga from "../../assets/yoga.jpg";
import zumba from "../../assets/zumba.jpg";
import cardio from "../../assets/cardio.jpg";
import strength from "../../assets/strength.jpg";

function ClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const fromBookings = location.state?.fromBookings === true;

  const [selectedClass, setSelectedClass] = useState(null);
  const [booking, setBooking] = useState(null);

  const [showSlots, setShowSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [loading, setLoading] = useState(true);
  const [changingSlot, setChangingSlot] = useState(false);
  const [error, setError] = useState("");

  const classImages = {
    "yoga.jpg": yoga,
    "zumba.jpg": zumba,
    "cardio.jpg": cardio,
    "strength.jpg": strength,
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");

        /*
         * IMPORTANT:
         *
         * Normal Classes page:
         * /dashboard/classes/:classId
         *
         * Booking page:
         * /dashboard/classes/:bookingId
         * with state { fromBookings: true }
         */

        if (fromBookings) {
          const response = await api.get(`/bookings/${id}`);

          const bookingData =
            response.data?.booking || response.data;

          if (!bookingData) {
            throw new Error("Booking not found");
          }

          setBooking(bookingData);

          const classData = bookingData?.class;

          if (!classData) {
            throw new Error(
              "Class details are not available for this booking."
            );
          }

          /*
           * If class is only an ObjectId/string,
           * fetch complete class details.
           */
          if (typeof classData === "string") {
            const classResponse = await api.get(
              `/classes/${classData}`
            );

            setSelectedClass(
              classResponse.data?.class ||
                classResponse.data
            );
          } else {
            setSelectedClass(classData);
          }
        } else {
          /*
           * Normal View Details:
           * id MUST be class._id
           */
          const response = await api.get(
            `/classes/${id}`
          );

          const classData =
            response.data?.class || response.data;

          if (!classData) {
            throw new Error("Class details not found");
          }

          setSelectedClass(classData);
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Unable to load class details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    } else {
      setError("Invalid class or booking ID.");
      setLoading(false);
    }
  }, [id, fromBookings]);

  const getClassDateTime = () => {
    if (!selectedClass?.date) {
      return null;
    }

    /*
     * Class can have time in:
     *
     * selectedClass.time
     *
     * OR
     *
     * selectedClass.timeSlots[0]
     */

    let time =
      selectedClass.time ||
      selectedClass.timeSlots?.[0] ||
      "";

    time = String(time).trim();

    if (!time) {
      return null;
    }

    if (time.includes("-")) {
      time = time.split("-")[0].trim();
    }

    let hours;
    let minutes;

    const amPmMatch = time.match(
      /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
    );

    if (amPmMatch) {
      hours = Number(amPmMatch[1]);
      minutes = Number(amPmMatch[2]);

      const period = amPmMatch[3].toUpperCase();

      if (period === "PM" && hours !== 12) {
        hours += 12;
      }

      if (period === "AM" && hours === 12) {
        hours = 0;
      }
    } else {
      const timeMatch = time.match(
        /^(\d{1,2}):(\d{2})$/
      );

      if (!timeMatch) {
        return null;
      }

      hours = Number(timeMatch[1]);
      minutes = Number(timeMatch[2]);
    }

    /*
     * MongoDB date can sometimes come as:
     * 2026-09-25T00:00:00.000Z
     *
     * So convert safely.
     */

    const rawDate = String(selectedClass.date);

    let year;
    let month;
    let day;

    if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
      const dateParts = rawDate
        .split("-")
        .map(Number);

      [year, month, day] = dateParts;
    } else {
      const parsedDate = new Date(rawDate);

      if (Number.isNaN(parsedDate.getTime())) {
        return null;
      }

      year = parsedDate.getFullYear();
      month = parsedDate.getMonth() + 1;
      day = parsedDate.getDate();
    }

    return new Date(
      year,
      month - 1,
      day,
      hours,
      minutes,
      0,
      0
    );
  };

  const isBookingAllowed = () => {
    const classDateTime = getClassDateTime();

    if (!classDateTime) {
      return false;
    }

    const hoursRemaining =
      (classDateTime.getTime() - Date.now()) /
      (1000 * 60 * 60);

    return hoursRemaining >= 24;
  };

  const isChangeAllowed = () => {
    const classDateTime = getClassDateTime();

    if (!classDateTime) {
      return false;
    }

    const hoursRemaining =
      (classDateTime.getTime() - Date.now()) /
      (1000 * 60 * 60);

    return hoursRemaining > 24;
  };

  const handleChangeSlot = async () => {
    if (!selectedSlot || !booking?._id) {
      return;
    }

    if (!isChangeAllowed()) {
      return;
    }

    try {
      setChangingSlot(true);
      setError("");

      const response = await api.put(
        `/bookings/change-slot/${booking._id}`,
        {
          selectedSlot,
        }
      );

      const updatedBooking =
        response.data?.booking || response.data;

      setBooking(updatedBooking);

      setShowSlots(false);
      setSelectedSlot("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to change time slot"
      );
    } finally {
      setChangingSlot(false);
    }
  };

  const handleBookNow = () => {
    if (!selectedClass?._id) {
      return;
    }

    navigate(
      `/dashboard/booking/${selectedClass._id}`
    );
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-5" />

          <h2 className="text-xl font-semibold text-gray-700">
            Loading class details...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait while we load the class.
          </p>
        </div>
      </div>
    );
  }

  if (error || !selectedClass) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-2xl font-bold">
            !
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            {error || "Class details not found"}
          </h2>

          <button
            onClick={() =>
              navigate("/dashboard/classes")
            }
            className="w-full min-h-12 mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Back to Classes
          </button>
        </div>
      </div>
    );
  }

  const seatsAvailable = Number(
    selectedClass.seats ?? 0
  );

  const canBook =
    seatsAvailable > 0 && isBookingAllowed();

  const timeSlots = Array.isArray(
    selectedClass.timeSlots
  )
    ? selectedClass.timeSlots
    : [];

  const canChange =
    fromBookings && isChangeAllowed();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="max-w-6xl mx-auto">

        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-2xl shadow-lg mb-8">
          <img
            src={
              classImages[selectedClass.image] ||
              strength
            }
            alt={selectedClass.title}
            className="w-full h-72 md:h-96 object-cover"
          />

          <div className="absolute top-5 left-5">
            <span className="px-4 py-2 bg-white/95 rounded-full text-sm font-semibold text-blue-600 shadow">
              {selectedClass.category || "Fitness"}
            </span>
          </div>

          <div className="absolute bottom-5 right-5 bg-white rounded-xl shadow-lg px-5 py-3">
            <p className="text-xs text-gray-500">
              Price
            </p>

            <p className="text-2xl font-bold text-blue-600">
              ₹{selectedClass.price ?? 0}
            </p>
          </div>
        </div>

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {selectedClass.title}
          </h1>

          <p className="text-gray-600 mt-3 leading-7 max-w-4xl">
            {selectedClass.description ||
              "Professional fitness class designed to help you reach your goals."}
          </p>
        </div>

        {/* INFORMATION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">

          <DetailItem
            label="Trainer"
            value={
              selectedClass.trainer?.name ||
              booking?.trainer?.name ||
              "Not Assigned"
            }
          />

          <DetailItem
            label="Category"
            value={
              selectedClass.category || "N/A"
            }
          />

          <DetailItem
            label="Date"
            value={
              selectedClass.date
                ? new Date(
                    selectedClass.date
                  ).toLocaleDateString("en-GB")
                : "N/A"
            }
          />

          <DetailItem
            label="Time"
            value={
              selectedClass.time ||
              selectedClass.timeSlots?.[0] ||
              "N/A"
            }
          />

          <DetailItem
            label="Duration"
            value={`${selectedClass.duration || 0} mins`}
          />

          <DetailItem
            label="Price"
            value={`₹${selectedClass.price ?? 0}`}
            highlight
          />

          <DetailItem
            label="Seats Available"
            value={seatsAvailable}
            valueClass={
              seatsAvailable > 0
                ? "text-green-600"
                : "text-red-600"
            }
          />

          {booking && (
            <DetailItem
              label="Booked Slot"
              value={
                booking.selectedSlot ||
                "Not Selected"
              }
              highlight
            />
          )}

          {booking && (
            <DetailItem
              label="Booking Status"
              value={
                booking.bookingStatus || "N/A"
              }
              valueClass="text-green-600"
            />
          )}
        </div>

        {/* BOOKING CONTENT */}
        {fromBookings ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">

            <div className="flex flex-col gap-5">

              {selectedClass.meetingLink && (
                <a
                  href={selectedClass.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-12 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center"
                >
                  Join Meeting
                </a>
              )}

              {canChange ? (
                !showSlots ? (
                  <button
                    onClick={() =>
                      setShowSlots(true)
                    }
                    className="w-full min-h-12 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    Change Slot
                  </button>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6">

                    <h2 className="text-xl font-bold text-gray-900 mb-5">
                      Select New Time Slot
                    </h2>

                    {timeSlots.length === 0 ? (
                      <p className="text-red-500">
                        No time slots available.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {timeSlots.map(
                          (slot, index) => (
                            <label
                              key={`${slot}-${index}`}
                              className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${
                                selectedSlot === slot
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 bg-white hover:border-blue-300"
                              }`}
                            >
                              <input
                                type="radio"
                                name="newSlot"
                                value={slot}
                                checked={
                                  selectedSlot === slot
                                }
                                onChange={(e) =>
                                  setSelectedSlot(
                                    e.target.value
                                  )
                                }
                                className="w-5 h-5 accent-blue-600"
                              />

                              <span className="font-semibold text-gray-800">
                                {slot}
                              </span>
                            </label>
                          )
                        )}

                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                      <button
                        onClick={
                          handleChangeSlot
                        }
                        disabled={
                          !selectedSlot ||
                          changingSlot
                        }
                        className={`min-h-12 px-6 py-3 rounded-xl text-white font-semibold transition ${
                          selectedSlot &&
                          !changingSlot
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                      >
                        {changingSlot
                          ? "Changing..."
                          : "Confirm New Slot"}
                      </button>

                      <button
                        onClick={() => {
                          setShowSlots(false);
                          setSelectedSlot("");
                        }}
                        className="min-h-12 px-6 py-3 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>

                    </div>
                  </div>
                )
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">

                  <h3 className="text-lg font-bold text-red-600">
                    Schedule Cannot Be Changed
                  </h3>

                  <p className="text-red-500 mt-1">
                    Time slot changes are allowed
                    only before 24 hours of the
                    class.
                  </p>

                </div>
              )}

            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">

            {seatsAvailable <= 0 ? (
              <div className="flex flex-col gap-5">

                <StatusMessage
                  title="Class Full"
                  message="Sorry, there are no available seats for this class."
                />

                <button
                  disabled
                  className="w-full min-h-12 px-6 py-3 bg-gray-300 text-gray-500 rounded-xl cursor-not-allowed font-semibold"
                >
                  No Seats Available
                </button>

              </div>
            ) : !isBookingAllowed() ? (
              <div className="flex flex-col gap-5">

                <StatusMessage
                  title="Booking Closed"
                  message="Booking is allowed only when the class is at least 24 hours away."
                />

                <button
                  disabled
                  className="w-full min-h-12 px-6 py-3 bg-gray-300 text-gray-500 rounded-xl cursor-not-allowed font-semibold"
                >
                  Booking Closed
                </button>

              </div>
            ) : (
              <button
                onClick={handleBookNow}
                disabled={!canBook}
                className={`w-full min-h-12 px-6 py-3 rounded-xl text-white font-semibold transition ${
                  canBook
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Book Now
              </button>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
  highlight,
  valueClass = "",
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
      <p className="text-sm text-gray-500 mb-2">
        {label}
      </p>

      <p
        className={`font-semibold ${
          highlight
            ? "text-blue-600"
            : valueClass || "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function StatusMessage({ title, message }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-5">
      <h3 className="text-lg font-bold text-red-600">
        {title}
      </h3>

      <p className="text-red-500 mt-1">
        {message}
      </p>
    </div>
  );
}

export default ClassDetails;