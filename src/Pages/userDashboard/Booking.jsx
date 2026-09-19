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

  // --------------------------------------------------
  // FETCH CLASS
  // --------------------------------------------------

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

  // --------------------------------------------------
  // CLASS IMAGE
  // --------------------------------------------------

  const classImage =
    classImages[selectedClass?.image] || strength;

  // --------------------------------------------------
  // CHECK FULL CLASS
  // --------------------------------------------------

  const isFull =
    Number(selectedClass?.seats || 0) <= 0;

  // --------------------------------------------------
  // TIME SLOTS
  // --------------------------------------------------

  const timeSlots = Array.isArray(
    selectedClass?.timeSlots
  )
    ? selectedClass.timeSlots
    : [];

  // --------------------------------------------------
  // CONVERT SLOT TO DATE + TIME
  // --------------------------------------------------

  const getClassDateTime = (slot) => {
    if (!selectedClass?.date || !slot) {
      return null;
    }

    let time = String(slot).trim();

    // Example:
    // 7:00 AM - 8:00 AM
    // We only need class starting time
    if (time.includes("-")) {
      time = time.split("-")[0].trim();
    }

    let hours;
    let minutes;

    // -----------------------------------------------
    // AM / PM FORMAT
    // -----------------------------------------------

    const amPmMatch = time.match(
      /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
    );

    if (amPmMatch) {
      hours = Number(amPmMatch[1]);
      minutes = Number(amPmMatch[2]);

      const period =
        amPmMatch[3].toUpperCase();

      if (period === "PM" && hours !== 12) {
        hours += 12;
      }

      if (period === "AM" && hours === 12) {
        hours = 0;
      }
    } else {
      // ---------------------------------------------
      // 24 HOUR FORMAT
      // ---------------------------------------------

      const timeMatch = time.match(
        /^(\d{1,2}):(\d{2})$/
      );

      if (!timeMatch) {
        return null;
      }

      hours = Number(timeMatch[1]);
      minutes = Number(timeMatch[2]);
    }

    // -----------------------------------------------
    // DATE
    // -----------------------------------------------

    const dateParts = String(selectedClass.date)
      .split("-")
      .map(Number);

    if (dateParts.length !== 3) {
      return null;
    }

    const [year, month, day] = dateParts;

    const classDateTime = new Date(
      year,
      month - 1,
      day,
      hours,
      minutes,
      0,
      0
    );

    if (Number.isNaN(classDateTime.getTime())) {
      return null;
    }

    return classDateTime;
  };

  // --------------------------------------------------
  // BOOKING VALIDATION
  // --------------------------------------------------

  const isBookingAllowed = () => {
    if (!selectedClass) {
      return false;
    }

    if (isFull) {
      return false;
    }

    if (!selectedSlot) {
      return false;
    }

    const classDateTime =
      getClassDateTime(selectedSlot);

    if (!classDateTime) {
      return false;
    }

    const now = new Date();

    // Class must be at least 24 hours from now
    const minimumBookingTime =
      now.getTime() +
      24 * 60 * 60 * 1000;

    return (
      classDateTime.getTime() >=
      minimumBookingTime
    );
  };

  const bookingAllowed = selectedSlot
    ? isBookingAllowed()
    : false;

  // --------------------------------------------------
  // HANDLE BOOKING
  // --------------------------------------------------

  const handleBooking = () => {
    if (isFull) {
      return;
    }

    if (!selectedSlot) {
      return;
    }

    if (!bookingAllowed) {
      return;
    }

    navigate("/dashboard/payments", {
      state: {
        classData: selectedClass,
        selectedSlot,
      },
    });
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-8 py-10 text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-5" />

          <h2 className="text-xl font-semibold text-gray-700">
            Loading class...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait while we load the class details.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (error || !selectedClass) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-2xl text-red-600">
              !
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {error || "Class not found"}
          </h2>

          <p className="text-gray-500 mb-6">
            We could not load the selected class.
            Please try again.
          </p>

          <button
            onClick={() =>
              navigate("/dashboard/classes")
            }
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Back to Classes
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // MAIN UI
  // --------------------------------------------------

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="max-w-5xl mx-auto">

        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Book Your Class
          </h1>

          <p className="mt-2 text-gray-500 text-base md:text-lg">
            Choose your preferred time slot and
            continue with your booking.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

          {/* CLASS IMAGE */}
          <div className="relative">
            <img
              src={classImage}
              alt={selectedClass.title}
              className="w-full h-64 sm:h-80 object-cover"
            />

            {/* CATEGORY BADGE */}
            <div className="absolute top-5 left-5">
              <span className="inline-flex items-center px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-blue-600 shadow-md">
                {selectedClass.category ||
                  "Fitness"}
              </span>
            </div>

            {/* PRICE */}
            <div className="absolute bottom-5 right-5">
              <div className="bg-white rounded-xl shadow-lg px-5 py-3">
                <p className="text-xs text-gray-500">
                  Class Price
                </p>

                <p className="text-2xl font-bold text-blue-600">
                  ₹{selectedClass.price || 0}
                </p>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-5 sm:p-7 lg:p-9">

            {/* TITLE */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {selectedClass.title}
              </h2>

              <p className="mt-3 text-gray-600 leading-7">
                {selectedClass.description ||
                  "Enjoy a professional fitness session with our experienced trainers."}
              </p>
            </div>

            {/* CLASS INFORMATION */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-5">
                Class Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* TRAINER */}
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                  <p className="text-sm text-gray-500 mb-2">
                    Trainer
                  </p>

                  <p className="font-semibold text-gray-800">
                    {selectedClass.trainer?.name ||
                      "Not Assigned"}
                  </p>
                </div>

                {/* CATEGORY */}
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                  <p className="text-sm text-gray-500 mb-2">
                    Category
                  </p>

                  <p className="font-semibold text-gray-800">
                    {selectedClass.category ||
                      "N/A"}
                  </p>
                </div>

                {/* DATE */}
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                  <p className="text-sm text-gray-500 mb-2">
                    Date
                  </p>

                  <p className="font-semibold text-gray-800">
                    {selectedClass.date ||
                      "N/A"}
                  </p>
                </div>

                {/* DURATION */}
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                  <p className="text-sm text-gray-500 mb-2">
                    Duration
                  </p>

                  <p className="font-semibold text-gray-800">
                    {selectedClass.duration ||
                      0}{" "}
                    mins
                  </p>
                </div>

                {/* PRICE */}
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                  <p className="text-sm text-gray-500 mb-2">
                    Price
                  </p>

                  <p className="font-semibold text-blue-600">
                    ₹{selectedClass.price || 0}
                  </p>
                </div>

                {/* SEATS */}
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                  <p className="text-sm text-gray-500 mb-2">
                    Seats Available
                  </p>

                  <p
                    className={`font-semibold ${
                      Number(
                        selectedClass.seats
                      ) > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedClass.seats || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* CLASS FULL */}
            {isFull && (
              <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="font-bold text-red-600">
                      !
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-red-700">
                      Class Full
                    </h3>

                    <p className="mt-1 text-red-600">
                      No seats are available for
                      this class.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TIME SLOTS */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Available Time Slots
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Select one available slot to
                    continue.
                  </p>
                </div>
              </div>

              {timeSlots.length === 0 ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <p className="font-medium text-red-600">
                    No time slots available for
                    this class.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {timeSlots.map(
                    (slot, index) => {
                      const isSelected =
                        selectedSlot === slot;

                      return (
                        <label
                          key={`${slot}-${index}`}
                          className={`relative flex items-center gap-4 p-4 border-2 rounded-xl transition ${
                            isFull
                              ? "cursor-not-allowed opacity-60"
                              : "cursor-pointer"
                          } ${
                            isSelected
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="slot"
                            value={slot}
                            checked={
                              isSelected
                            }
                            disabled={isFull}
                            onChange={(e) =>
                              setSelectedSlot(
                                e.target.value
                              )
                            }
                            className="w-5 h-5 accent-green-600"
                          />

                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">
                              {slot}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                              Available slot
                            </p>
                          </div>

                          {isSelected && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                              Selected
                            </span>
                          )}
                        </label>
                      );
                    }
                  )}
                </div>
              )}
            </div>

            {/* BOOKING CLOSED MESSAGE */}
            {selectedSlot &&
              !bookingAllowed &&
              !isFull && (
                <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="font-bold text-red-600">
                        !
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-red-700">
                        Booking Closed
                      </h3>

                      <p className="mt-1 text-red-600 leading-6">
                        This class can only be
                        booked at least 24 hours
                        before the scheduled date
                        and time.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            {/* BOOKING ACTION */}
            <div className="pt-2 border-t border-gray-200">
              <button
                disabled={
                  isFull ||
                  !selectedSlot ||
                  timeSlots.length === 0 ||
                  !bookingAllowed
                }
                onClick={handleBooking}
                className={`w-full min-h-14 px-6 py-3 rounded-xl text-base font-semibold transition flex items-center justify-center ${
                  !isFull &&
                  selectedSlot &&
                  timeSlots.length > 0 &&
                  bookingAllowed
                    ? "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isFull
                  ? "Class Full"
                  : !selectedSlot
                  ? "Select a Time Slot"
                  : !bookingAllowed
                  ? "Booking Closed"
                  : "Proceed to Payment"}
              </button>

              {!isFull &&
                !selectedSlot && (
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Please select a time slot
                    to continue.
                  </p>
                )}

              {!isFull &&
                selectedSlot &&
                bookingAllowed && (
                  <p className="text-center text-sm text-green-600 mt-3">
                    This class is available for
                    booking.
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;