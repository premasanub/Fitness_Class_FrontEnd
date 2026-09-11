// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../../Service/api";

// import yoga from "../../assets/yoga.jpg";
// import zumba from "../../assets/zumba.jpg";
// import cardio from "../../assets/cardio.jpg";
// import strength from "../../assets/strength.jpg";

// function Booking() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [selectedClass, setSelectedClass] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState("");
//   const [loading, setLoading] = useState(true);

//   const classImages = {
//     "yoga.jpg": yoga,
//     "zumba.jpg": zumba,
//     "cardio.jpg": cardio,
//     "strength.jpg": strength,
//   };

//   useEffect(() => {
//     fetchClass();
//   }, [id]);

//   const fetchClass = async () => {
//     try {
//       setLoading(true);

//       const response = await api.get(`/classes/${id}`);

//       console.log("CLASS API RESPONSE:", response.data);

//       const trainerClass =
//         response.data.class || response.data;

//       setSelectedClass(trainerClass);
//     } catch (error) {
//       console.log(
//         "FETCH CLASS ERROR:",
//         error.response?.data || error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================
//   // Convert selected slot to class start time
//   // ============================================
//   const getClassDateTime = (slot = selectedClass?.time) => {
//     if (!selectedClass?.date || !slot) {
//       return null;
//     }

//     let time = slot.trim();

//     // Example:
//     // "07:00 AM - 08:00 AM"
//     // Take only starting time
//     if (time.includes("-")) {
//       time = time.split("-")[0].trim();
//     }

//     let hours;
//     let minutes;

//     // 12 hour format
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
//       // 24 hour format
//       const timeMatch = time.match(
//         /^(\d{1,2}):(\d{2})$/
//       );

//       if (!timeMatch) {
//         return null;
//       }

//       hours = Number(timeMatch[1]);
//       minutes = Number(timeMatch[2]);
//     }

//     // Expected date: YYYY-MM-DD
//     const dateParts = selectedClass.date
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

//   // ============================================
//   // Check whether booking is allowed
//   // ============================================
//   const isBookingAllowed = () => {
//     if (!selectedClass) {
//       return false;
//     }

//     /*
//       If user has selected a slot,
//       check that slot.

//       Otherwise check the class's default time.
//     */
//     const classDateTime = getClassDateTime(
//       selectedSlot || selectedClass.time
//     );

//     if (!classDateTime) {
//       return false;
//     }

//     const now = new Date();

//     const difference =
//       classDateTime.getTime() - now.getTime();

//     const hoursRemaining =
//       difference / (1000 * 60 * 60);

//     console.log("Class Date:", classDateTime);
//     console.log("Current Date:", now);
//     console.log("Hours Remaining:", hoursRemaining);

//     // MUST have at least 24 hours
//     return hoursRemaining >= 24;
//   };

//   // ============================================
//   // Seats
//   // ============================================
//   const isFull = Number(selectedClass?.seats) <= 0;

//   // ============================================
//   // Time slots
//   // ============================================
//   const timeSlots = selectedClass?.timeSlots || [];

//   // ============================================
//   // Proceed to payment
//   // ============================================
//   const handleBooking = () => {
//     // Check seats
//     if (isFull) {
//       alert("No seats available for this class.");
//       return;
//     }

//     // Check slot
//     if (!selectedSlot) {
//       alert("Please select a time slot.");
//       return;
//     }

//     // IMPORTANT: Check 24 hours again
//     if (!isBookingAllowed()) {
//       alert(
//         "Booking is closed. You can book only 24 hours before the class."
//       );
//       return;
//     }

//     // Only now go to payment
//     navigate("/dashboard/payments", {
//       state: {
//         classData: selectedClass,
//         selectedSlot,
//       },
//     });
//   };

//   // ============================================
//   // Loading
//   // ============================================
//   if (loading) {
//     return (
//       <div className="p-6 text-center">
//         <h2 className="text-2xl font-bold">
//           Loading...
//         </h2>
//       </div>
//     );
//   }

//   // ============================================
//   // Class not found
//   // ============================================
//   if (!selectedClass) {
//     return (
//       <div className="p-6 text-center">
//         <h2 className="text-2xl font-bold text-red-500">
//           Class not found
//         </h2>

//         <button
//           onClick={() =>
//             navigate("/dashboard/classes")
//           }
//           className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
//         >
//           Back to Classes
//         </button>
//       </div>
//     );
//   }

//   // Check before rendering
//   const bookingAllowed = isBookingAllowed();

//   return (
//     <div className="max-w-4xl mx-auto p-6">

//       <h1 className="text-3xl font-bold mb-6">
//         Book Your Class
//       </h1>

//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">

//         <img
//           src={
//             classImages[selectedClass.image] ||
//             strength
//           }
//           alt={selectedClass.title}
//           className="w-full h-64 object-cover"
//         />

//         <div className="p-6">

//           <h2 className="text-3xl font-bold mb-4">
//             {selectedClass.title}
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//             <p>
//               <strong>Trainer:</strong>{" "}
//               {selectedClass.trainer?.name ||
//                 "Not Assigned"}
//             </p>

//             <p>
//               <strong>Category:</strong>{" "}
//               {selectedClass.category}
//             </p>

//             <p>
//               <strong>Date:</strong>{" "}
//               {selectedClass.date}
//             </p>

//             <p>
//               <strong>Duration:</strong>{" "}
//               {selectedClass.duration} mins
//             </p>

//             <p>
//               <strong>Price:</strong>{" "}
//               ₹{selectedClass.price}
//             </p>

//             <p>
//               <strong>Seats:</strong>{" "}
//               {selectedClass.seats}
//             </p>

//           </div>

//           {/* ================================= */}
//           {/* BOOKING CLOSED MESSAGE */}
//           {/* ================================= */}

//           {!bookingAllowed && (
//             <div className="mt-6 bg-red-50 border border-red-300 rounded-lg p-5">

//               <h3 className="text-lg font-bold text-red-600">
//                 Booking Closed
//               </h3>

//               <p className="text-red-500 mt-1">
//                 Booking is allowed only 24 hours
//                 before the class.
//               </p>

//             </div>
//           )}

//           {/* ================================= */}
//           {/* TIME SLOTS */}
//           {/* ================================= */}

//           <h2 className="text-xl font-bold mt-8 mb-4">
//             Available Time Slots
//           </h2>

//           {isFull ? (

//             <div className="bg-red-50 border border-red-300 text-red-600 p-5 rounded-lg">

//               <h3 className="font-bold text-lg">
//                 Class Full
//               </h3>

//               <p className="mt-1">
//                 No seats are available for this class.
//               </p>

//             </div>

//           ) : timeSlots.length === 0 ? (

//             <p className="text-red-500 border p-4 rounded-lg">
//               No time slots available for this class.
//             </p>

//           ) : (

//             <div className="space-y-3">

//               {timeSlots.map((slot, index) => (

//                 <label
//                   key={index}
//                   className={`flex items-center gap-3 border p-4 rounded-lg transition ${
//                     selectedSlot === slot
//                       ? "border-green-500 bg-green-50"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >

//                   <input
//                     type="radio"
//                     name="slot"
//                     value={slot}
//                     checked={
//                       selectedSlot === slot
//                     }
//                     onChange={(e) => {
//                       setSelectedSlot(
//                         e.target.value
//                       );
//                     }}
//                   />

//                   <span className="font-medium">
//                     {slot}
//                   </span>

//                 </label>

//               ))}

//             </div>
//           )}

//           {/* ================================= */}
//           {/* PAYMENT BUTTON */}
//           {/* ================================= */}

//           <button
//             disabled={
//               isFull ||
//               !selectedSlot ||
//               timeSlots.length === 0 ||
//               !bookingAllowed
//             }
//             onClick={handleBooking}
//             className={`mt-8 px-6 py-3 rounded-lg text-white font-semibold ${
//               !isFull &&
//               selectedSlot &&
//               timeSlots.length > 0 &&
//               bookingAllowed
//                 ? "bg-green-600 hover:bg-green-700"
//                 : "bg-gray-400 cursor-not-allowed"
//             }`}
//           >
//             {isFull
//               ? "Class Full"
//               : !bookingAllowed
//               ? "Booking Closed"
//               : "Proceed to Payment"}
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Booking;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Service/api";

import yoga from "../../assets/yoga.jpg";
import zumba from "../../assets/zumba.jpg";
import cardio from "../../assets/cardio.jpg";
import strength from "../../assets/strength.jpg";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const classImages = {
    "yoga.jpg": yoga,
    "zumba.jpg": zumba,
    "cardio.jpg": cardio,
    "strength.jpg": strength,
  };

  useEffect(() => {
    const fetchClass = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/classes/${id}`);

        const trainerClass =
          response.data?.class || response.data;

        setSelectedClass(trainerClass);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Unable to load class details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [id]);

  const getClassDateTime = (slot = selectedClass?.time) => {
    if (!selectedClass?.date || !slot) {
      return null;
    }

    let time = String(slot).trim();

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
    if (!selectedClass) {
      return false;
    }

    const classDateTime = getClassDateTime(
      selectedSlot || selectedClass.time
    );

    if (!classDateTime) {
      return false;
    }

    const now = new Date();

    const difference =
      classDateTime.getTime() - now.getTime();

    const hoursRemaining =
      difference / (1000 * 60 * 60);

    return hoursRemaining >= 24;
  };

  const isFull = Number(selectedClass?.seats) <= 0;

  const timeSlots = Array.isArray(selectedClass?.timeSlots)
    ? selectedClass.timeSlots
    : [];

  const handleBooking = () => {
    if (isFull) {
      return;
    }

    if (!selectedSlot) {
      return;
    }

    if (!isBookingAllowed()) {
      return;
    }

    navigate("/dashboard/payments", {
      state: {
        classData: selectedClass,
        selectedSlot,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center flex flex-col gap-3">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <h2 className="text-xl font-semibold text-gray-700">
            Loading class...
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
            {error || "Class not found"}
          </h2>

          <button
            onClick={() =>
              navigate("/dashboard/classes")
            }
            className="min-h-11 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            Back to Classes
          </button>
        </div>
      </div>
    );
  }

  const bookingAllowed = isBookingAllowed();

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Book Your Class
        </h1>

        <p className="text-gray-500">
          Select your preferred time slot to continue.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <img
          src={
            classImages[selectedClass.image] ||
            strength
          }
          alt={selectedClass.title}
          className="w-full h-64 object-cover"
        />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedClass.title}
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {selectedClass.description ||
                "Enjoy a professional fitness session with our experienced trainers."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="border border-gray-200 rounded-xl min-h-16 flex flex-col justify-center">
              <span className="text-sm text-gray-500">
                Trainer
              </span>
              <strong className="text-gray-800">
                {selectedClass.trainer?.name ||
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
                  Number(selectedClass.seats) > 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {selectedClass.seats || 0}
              </strong>
            </div>
          </div>

          {!bookingAllowed && (
            <div className="bg-red-50 border border-red-200 rounded-xl min-h-24 flex flex-col justify-center gap-2">
              <h3 className="text-lg font-bold text-red-600">
                Booking Closed
              </h3>

              <p className="text-red-500">
                Booking is available only when the class
                is at least 24 hours away.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              Available Time Slots
            </h2>

            {isFull ? (
              <div className="bg-red-50 border border-red-200 rounded-xl min-h-24 flex flex-col justify-center gap-2">
                <h3 className="font-bold text-lg text-red-600">
                  Class Full
                </h3>

                <p className="text-red-500">
                  No seats are available for this class.
                </p>
              </div>
            ) : timeSlots.length === 0 ? (
              <div className="border border-red-200 bg-red-50 rounded-xl min-h-20 flex items-center">
                <p className="text-red-500">
                  No time slots available for this class.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {timeSlots.map((slot, index) => (
                  <label
                    key={`${slot}-${index}`}
                    className={`min-h-14 flex items-center gap-3 border rounded-xl cursor-pointer transition ${
                      selectedSlot === slot
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="slot"
                      value={slot}
                      checked={selectedSlot === slot}
                      onChange={(e) =>
                        setSelectedSlot(e.target.value)
                      }
                      className="accent-green-600"
                    />

                    <span className="font-medium text-gray-800">
                      {slot}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            disabled={
              isFull ||
              !selectedSlot ||
              timeSlots.length === 0 ||
              !bookingAllowed
            }
            onClick={handleBooking}
            className={`w-full min-h-12 rounded-xl text-white font-semibold transition flex items-center justify-center ${
              !isFull &&
              selectedSlot &&
              timeSlots.length > 0 &&
              bookingAllowed
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isFull
              ? "Class Full"
              : !bookingAllowed
              ? "Booking Closed"
              : !selectedSlot
              ? "Select a Time Slot"
              : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Booking;