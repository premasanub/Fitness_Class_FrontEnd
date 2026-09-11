


// import { useEffect, useState } from "react";
// import {
//   useParams,
//   useNavigate,
//   useLocation,
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

//   const fromBookings = location.state?.fromBookings || false;

//   const [selectedClass, setSelectedClass] = useState(null);
//   const [booking, setBooking] = useState(null);

//   const [showSlots, setShowSlots] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [changingSlot, setChangingSlot] = useState(false);

//   const classImages = {
//     "yoga.jpg": yoga,
//     "zumba.jpg": zumba,
//     "cardio.jpg": cardio,
//     "strength.jpg": strength,
//   };

//   useEffect(() => {
//     fetchDetails();
//   }, [id, fromBookings]);

//   const fetchDetails = async () => {
//     try {
//       setLoading(true);

//       if (fromBookings) {
//         const response = await api.get(`/bookings/${id}`);

//         console.log("BOOKING DETAILS:", response.data);

//         setBooking(response.data);
//         setSelectedClass(response.data.class);
//       } else {
//         const response = await api.get(`/classes/${id}`);

//         console.log("CLASS DETAILS:", response.data);

//         setSelectedClass(
//           response.data.class || response.data
//         );
//       }
//     } catch (error) {
//       console.log(
//         "DETAILS ERROR:",
//         error.response?.data || error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================
//   // Convert class date + time into Date object
//   // ============================================
//   const getClassDateTime = () => {
//     if (!selectedClass?.date || !selectedClass?.time) {
//       return null;
//     }

//     let time = selectedClass.time.trim();

//     /*
//       Supports:
//       07:00
//       07:00 AM
//       07:00 AM - 08:00 AM
//       7:00 AM - 8:00 AM
//     */

//     // If time contains range, take starting time
//     if (time.includes("-")) {
//       time = time.split("-")[0].trim();
//     }

//     let hours;
//     let minutes;

//     // 12-hour format: 07:00 AM / 7:00 PM
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
//       // 24-hour format: 07:00 / 19:00
//       const timeMatch = time.match(
//         /^(\d{1,2}):(\d{2})$/
//       );

//       if (!timeMatch) {
//         return null;
//       }

//       hours = Number(timeMatch[1]);
//       minutes = Number(timeMatch[2]);
//     }

//     /*
//       Handles date safely.
//       Expected date format:
//       YYYY-MM-DD
//     */

//     const dateParts = selectedClass.date
//       .split("-")
//       .map(Number);

//     if (dateParts.length !== 3) {
//       return null;
//     }

//     const [year, month, day] = dateParts;

//     const classDateTime = new Date(
//       year,
//       month - 1,
//       day,
//       hours,
//       minutes,
//       0,
//       0
//     );

//     return classDateTime;
//   };

//   // ============================================
//   // Booking allowed only BEFORE 24 hours
//   // ============================================
//   const isBookingAllowed = () => {
//     const classDateTime = getClassDateTime();

//     if (!classDateTime) {
//       return false;
//     }

//     const now = new Date();

//     const difference =
//       classDateTime.getTime() - now.getTime();

//     const hoursRemaining =
//       difference / (1000 * 60 * 60);

//     /*
//       Booking is allowed only when:
//       class is more than 24 hours away.
//     */

//     return hoursRemaining >= 24;
//   };

//   // ============================================
//   // Check slot change allowed
//   // ============================================
//   const isChangeAllowed = () => {
//     const classDateTime = getClassDateTime();

//     if (!classDateTime) {
//       return false;
//     }

//     const now = new Date();

//     const difference =
//       classDateTime.getTime() - now.getTime();

//     const hoursRemaining =
//       difference / (1000 * 60 * 60);

//     return hoursRemaining > 24;
//   };

//   // ============================================
//   // Change Slot
//   // ============================================
//   const handleChangeSlot = async () => {
//     if (!selectedSlot) {
//       alert("Please select a time slot");
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

//       console.log(
//         "CHANGE SLOT RESPONSE:",
//         response.data
//       );

//       alert("Time slot changed successfully!");

//       setBooking(response.data.booking);

//       setShowSlots(false);
//       setSelectedSlot("");
//     } catch (error) {
//       console.log(
//         "CHANGE SLOT ERROR:",
//         error.response?.data || error.message
//       );

//       alert(
//         error.response?.data?.message ||
//           "Unable to change time slot"
//       );
//     } finally {
//       setChangingSlot(false);
//     }
//   };

//   // ============================================
//   // Loading
//   // ============================================
//   if (loading) {
//     return (
//       <h2 className="text-center text-3xl mt-20">
//         Loading...
//       </h2>
//     );
//   }

//   // ============================================
//   // Class not found
//   // ============================================
//   if (!selectedClass) {
//     return (
//       <div className="text-center mt-20">
//         <h2 className="text-2xl font-bold text-red-500">
//           Class details not found
//         </h2>

//         <button
//           onClick={() =>
//             navigate("/dashboard/classes")
//           }
//           className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg"
//         >
//           Back to Classes
//         </button>
//       </div>
//     );
//   }

//   // ============================================
//   // Seats
//   // ============================================
//   const seatsAvailable = Number(
//     selectedClass.seats || 0
//   );

//   // ============================================
//   // Booking permission
//   // ============================================
//   const canBook =
//     seatsAvailable > 0 && isBookingAllowed();

//   // ============================================
//   // Time slots
//   // ============================================
//   const timeSlots = [
//     selectedClass.time,
//     "10:00",
//     "14:00",
//     "17:00",
//   ];

//   const canChange =
//     fromBookings && isChangeAllowed();

//   return (
//     <div className="max-w-5xl mx-auto p-8">

//       {/* Image */}
//       <img
//         src={
//           classImages[selectedClass.image] ||
//           strength
//         }
//         alt={selectedClass.title}
//         className="w-full h-96 object-cover rounded-xl"
//       />

//       {/* Title */}
//       <h1 className="text-4xl font-bold mt-6">
//         {selectedClass.title}
//       </h1>

//       {/* Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

//         <p>
//           <strong>Trainer:</strong>{" "}
//           {selectedClass.trainer?.name ||
//             booking?.trainer?.name ||
//             "Not assigned"}
//         </p>

//         <p>
//           <strong>Category:</strong>{" "}
//           {selectedClass.category}
//         </p>

//         <p>
//           <strong>Date:</strong>{" "}
//           {selectedClass.date}
//         </p>

//         <p>
//           <strong>Time:</strong>{" "}
//           {selectedClass.time}
//         </p>

//         <p>
//           <strong>Duration:</strong>{" "}
//           {selectedClass.duration} mins
//         </p>

//         <p>
//           <strong>Price:</strong>{" "}
//           ₹{selectedClass.price}
//         </p>

//         <p>
//           <strong>Seats Available:</strong>{" "}

//           <span
//             className={
//               seatsAvailable > 0
//                 ? "text-green-600 font-semibold"
//                 : "text-red-600 font-semibold"
//             }
//           >
//             {seatsAvailable}
//           </span>
//         </p>

//         {booking && (
//           <p>
//             <strong>Booked Slot:</strong>{" "}
//             {booking.selectedSlot}
//           </p>
//         )}

//         {booking && (
//           <p>
//             <strong>Booking Status:</strong>{" "}

//             <span className="text-green-600 font-semibold">
//               {booking.bookingStatus}
//             </span>
//           </p>
//         )}

//       </div>

//       {/* Description */}
//       <p className="mt-6 text-gray-700">
//         {selectedClass.description}
//       </p>

//       {/* ================================= */}
//       {/* BOOKED CLASS */}
//       {/* ================================= */}

//       {fromBookings ? (

//         <div className="mt-8">

//           {/* Meeting */}
//           {selectedClass.meetingLink && (
//             <a
//               href={selectedClass.meetingLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
//             >
//               Join Meeting
//             </a>
//           )}

//           {/* Change Slot */}
//           {canChange ? (

//             <>
//               {!showSlots ? (

//                 <button
//                   onClick={() =>
//                     setShowSlots(true)
//                   }
//                   className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//                 >
//                   Change Slot
//                 </button>

//               ) : (

//                 <div className="border rounded-xl p-6 bg-gray-50 mt-6">

//                   <h2 className="text-xl font-bold mb-5">
//                     Select New Time Slot
//                   </h2>

//                   <div className="space-y-3">

//                     {timeSlots.map(
//                       (slot, index) => (

//                         <label
//                           key={index}
//                           className="flex items-center gap-3 border p-4 rounded-lg bg-white cursor-pointer hover:bg-gray-100"
//                         >

//                           <input
//                             type="radio"
//                             name="newSlot"
//                             value={slot}
//                             checked={
//                               selectedSlot === slot
//                             }
//                             onChange={(e) =>
//                               setSelectedSlot(
//                                 e.target.value
//                               )
//                             }
//                           />

//                           {slot}

//                         </label>
//                       )
//                     )}

//                   </div>

//                   <div className="flex gap-3 mt-6">

//                     <button
//                       onClick={
//                         handleChangeSlot
//                       }
//                       disabled={
//                         !selectedSlot ||
//                         changingSlot
//                       }
//                       className={`px-6 py-3 rounded-lg text-white ${
//                         selectedSlot &&
//                         !changingSlot
//                           ? "bg-green-600 hover:bg-green-700"
//                           : "bg-gray-400 cursor-not-allowed"
//                       }`}
//                     >
//                       {changingSlot
//                         ? "Changing..."
//                         : "Confirm New Slot"}
//                     </button>

//                     <button
//                       onClick={() => {
//                         setShowSlots(false);
//                         setSelectedSlot("");
//                       }}
//                       className="px-6 py-3 rounded-lg border"
//                     >
//                       Cancel
//                     </button>

//                   </div>

//                 </div>
//               )}

//             </>

//           ) : (

//             <div className="bg-red-50 border border-red-300 rounded-lg p-5 mt-6">

//               <h3 className="text-lg font-bold text-red-600">
//                 Schedule cannot be changed
//               </h3>

//               <p className="text-red-500 mt-2">
//                 Time slot changes are allowed only
//                 before 24 hours of the class.
//               </p>

//             </div>

//           )}

//         </div>

//       ) : (

//         /* ================================= */
//         /* NORMAL CLASS */
//         /* ================================= */

//         <div className="mt-8">

//           {/* ================================= */}
//           {/* NO SEATS */}
//           {/* ================================= */}

//           {seatsAvailable <= 0 ? (

//             <div>

//               <div className="bg-red-50 border border-red-300 rounded-lg p-5 mb-4">

//                 <h3 className="text-lg font-bold text-red-600">
//                   Class Full
//                 </h3>

//                 <p className="text-red-500 mt-1">
//                   Sorry, there are no available seats
//                   for this class.
//                 </p>

//               </div>

//               <button
//                 disabled
//                 className="bg-gray-400 text-white px-6 py-3 rounded-lg cursor-not-allowed"
//               >
//                 No Seats Available
//               </button>

//             </div>

//           ) : !isBookingAllowed() ? (

//             /* ================================= */
//             /* BOOKING CLOSED */
//             /* ================================= */

//             <div>

//               <div className="bg-red-50 border border-red-300 rounded-lg p-5 mb-4">

//                 <h3 className="text-lg font-bold text-red-600">
//                   Booking Closed
//                 </h3>

//                 <p className="text-red-500 mt-1">
//                   Booking is allowed only before
//                   24 hours of the class.
//                 </p>

//               </div>

//               <button
//                 disabled
//                 className="bg-gray-400 text-white px-6 py-3 rounded-lg cursor-not-allowed"
//               >
//                 Booking Closed
//               </button>

//             </div>

//           ) : (

//             /* ================================= */
//             /* BOOK NOW */
//             /* ================================= */

//             <button
//               onClick={() => {
//                 if (!canBook) {
//                   return;
//                 }

//                 navigate(
//                   `/dashboard/booking/${selectedClass._id}`
//                 );
//               }}
//               disabled={!canBook}
//               className={`px-6 py-3 rounded-lg text-white font-semibold ${
//                 canBook
//                   ? "bg-green-600 hover:bg-green-700"
//                   : "bg-gray-400 cursor-not-allowed"
//               }`}
//             >
//               Book Now
//             </button>

//           )}

//         </div>
//       )}

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

  const fromBookings =
    location.state?.fromBookings || false;

  const [selectedClass, setSelectedClass] =
    useState(null);

  const [booking, setBooking] = useState(null);
  const [showSlots, setShowSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [changingSlot, setChangingSlot] =
    useState(false);
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

        if (fromBookings) {
          const response = await api.get(
            `/bookings/${id}`
          );

          const bookingData = response.data;

          setBooking(bookingData);
          setSelectedClass(bookingData?.class || null);
        } else {
          const response = await api.get(
            `/classes/${id}`
          );

          setSelectedClass(
            response.data?.class || response.data
          );
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Unable to load class details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, fromBookings]);

  const getClassDateTime = () => {
    if (!selectedClass?.date || !selectedClass?.time) {
      return null;
    }

    let time = String(selectedClass.time).trim();

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

    const dateParts = String(selectedClass.date)
      .split("-")
      .map(Number);

    if (dateParts.length !== 3) {
      return null;
    }

    const [year, month, day] = dateParts;

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
    if (!selectedSlot) {
      return;
    }

    if (!isChangeAllowed()) {
      return;
    }

    try {
      setChangingSlot(true);

      const response = await api.put(
        `/bookings/change-slot/${booking._id}`,
        {
          selectedSlot,
        }
      );

      setBooking(response.data.booking);

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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center flex flex-col gap-3">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <h2 className="text-xl font-semibold text-gray-700">
            Loading class details...
          </h2>
        </div>
      </div>
    );
  }

  if (error || !selectedClass) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-red-500">
            {error || "Class details not found"}
          </h2>

          <button
            onClick={() =>
              navigate("/dashboard/classes")
            }
            className="min-h-11 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
          >
            Back to Classes
          </button>
        </div>
      </div>
    );
  }

  const seatsAvailable = Number(
    selectedClass.seats || 0
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
    <div className="w-full max-w-5xl flex flex-col gap-8">
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src={
            classImages[selectedClass.image] ||
            strength
          }
          alt={selectedClass.title}
          className="w-full h-80 md:h-96 object-cover"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {selectedClass.title}
        </h1>

        <p className="text-gray-600 leading-relaxed">
          {selectedClass.description ||
            "Professional fitness class designed to help you reach your goals."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="border border-gray-200 rounded-xl min-h-16 flex flex-col justify-center">
          <span className="text-sm text-gray-500">
            Trainer
          </span>

          <strong className="text-gray-800">
            {selectedClass.trainer?.name ||
              booking?.trainer?.name ||
              "Not Assigned"}
          </strong>
        </div>

        <div className="border border-gray-200 rounded-xl min-h-16 flex flex-col justify-center">
          <span className="text-sm text-gray-500">
            Category
          </span>

          <strong className="text-gray-800">
            {selectedClass.category || "N/A"}
          </strong>
        </div>

        <div className="border border-gray-200 rounded-xl min-h-16 flex flex-col justify-center">
          <span className="text-sm text-gray-500">
            Date
          </span>

          <strong className="text-gray-800">
            {selectedClass.date || "N/A"}
          </strong>
        </div>

        <div className="border border-gray-200 rounded-xl min-h-16 flex flex-col justify-center">
          <span className="text-sm text-gray-500">
            Time
          </span>

          <strong className="text-gray-800">
            {selectedClass.time || "N/A"}
          </strong>
        </div>

        <div className="border border-gray-200 rounded-xl min-h-16 flex flex-col justify-center">
          <span className="text-sm text-gray-500">
            Duration
          </span>

          <strong className="text-gray-800">
            {selectedClass.duration || 0} mins
          </strong>
        </div>

        <div className="border border-gray-200 rounded-xl min-h-16 flex flex-col justify-center">
          <span className="text-sm text-gray-500">
            Price
          </span>

          <strong className="text-blue-600">
            ₹{selectedClass.price || 0}
          </strong>
        </div>

        <div className="border border-gray-200 rounded-xl min-h-16 flex flex-col justify-center">
          <span className="text-sm text-gray-500">
            Seats Available
          </span>

          <strong
            className={
              seatsAvailable > 0
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {seatsAvailable}
          </strong>
        </div>

        {booking && (
          <div className="border border-gray-200 rounded-xl min-h-16 flex flex-col justify-center">
            <span className="text-sm text-gray-500">
              Booked Slot
            </span>

            <strong className="text-blue-600">
              {booking.selectedSlot ||
                "Not Selected"}
            </strong>
          </div>
        )}

        {booking && (
          <div className="border border-gray-200 rounded-xl min-h-16 flex flex-col justify-center">
            <span className="text-sm text-gray-500">
              Booking Status
            </span>

            <strong className="text-green-600">
              {booking.bookingStatus || "N/A"}
            </strong>
          </div>
        )}
      </div>

      {fromBookings ? (
        <div className="flex flex-col gap-6">
          {selectedClass.meetingLink && (
            <a
              href={selectedClass.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center"
            >
              Join Meeting
            </a>
          )}

          {canChange ? (
            !showSlots ? (
              <button
                onClick={() => setShowSlots(true)}
                className="min-h-11 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
              >
                Change Slot
              </button>
            ) : (
              <div className="border border-gray-200 rounded-xl bg-gray-50 flex flex-col gap-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Select New Time Slot
                </h2>

                {timeSlots.length === 0 ? (
                  <p className="text-red-500">
                    No time slots available.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {timeSlots.map(
                      (slot, index) => (
                        <label
                          key={`${slot}-${index}`}
                          className={`min-h-14 flex items-center gap-3 border rounded-lg cursor-pointer transition ${
                            selectedSlot === slot
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300 bg-white hover:bg-gray-50"
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
                            className="accent-blue-600"
                          />

                          <span className="font-medium">
                            {slot}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleChangeSlot}
                    disabled={
                      !selectedSlot ||
                      changingSlot
                    }
                    className={`min-h-11 rounded-lg text-white font-semibold flex items-center justify-center ${
                      selectedSlot &&
                      !changingSlot
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
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
                    className="min-h-11 rounded-lg border border-gray-300 font-semibold hover:bg-gray-100 flex items-center justify-center"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl min-h-24 flex flex-col justify-center gap-2">
              <h3 className="text-lg font-bold text-red-600">
                Schedule Cannot Be Changed
              </h3>

              <p className="text-red-500">
                Time slot changes are allowed only
                before 24 hours of the class.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {seatsAvailable <= 0 ? (
            <div className="flex flex-col gap-4">
              <div className="bg-red-50 border border-red-200 rounded-xl min-h-24 flex flex-col justify-center gap-2">
                <h3 className="text-lg font-bold text-red-600">
                  Class Full
                </h3>

                <p className="text-red-500">
                  Sorry, there are no available seats
                  for this class.
                </p>
              </div>

              <button
                disabled
                className="min-h-11 bg-gray-400 text-white rounded-lg cursor-not-allowed font-semibold flex items-center justify-center"
              >
                No Seats Available
              </button>
            </div>
          ) : !isBookingAllowed() ? (
            <div className="flex flex-col gap-4">
              <div className="bg-red-50 border border-red-200 rounded-xl min-h-24 flex flex-col justify-center gap-2">
                <h3 className="text-lg font-bold text-red-600">
                  Booking Closed
                </h3>

                <p className="text-red-500">
                  Booking is allowed only when the
                  class is at least 24 hours away.
                </p>
              </div>

              <button
                disabled
                className="min-h-11 bg-gray-400 text-white rounded-lg cursor-not-allowed font-semibold flex items-center justify-center"
              >
                Booking Closed
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                if (canBook) {
                  navigate(
                    `/dashboard/booking/${selectedClass._id}`
                  );
                }
              }}
              disabled={!canBook}
              className={`min-h-11 rounded-lg text-white font-semibold flex items-center justify-center ${
                canBook
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Book Now
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ClassDetails;