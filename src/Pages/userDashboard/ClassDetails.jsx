

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