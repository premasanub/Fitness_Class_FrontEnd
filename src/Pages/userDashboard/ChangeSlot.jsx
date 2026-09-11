

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../Service/api";

function ChangeSlot() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/bookings/${id}`
        );

        const bookingData = response.data;

        setBooking(bookingData);
        setSelectedSlot(
          bookingData?.selectedSlot || ""
        );

        setTimeSlots(
          Array.isArray(bookingData?.class?.timeSlots)
            ? bookingData.class.timeSlots
            : []
        );
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load booking"
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to load booking"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const getClassDateTime = () => {
    if (!booking?.class?.date || !booking?.class?.time) {
      return null;
    }

    let time = String(booking.class.time).trim();

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

    const dateParts = String(booking.class.date)
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

  const isChangeAllowed = () => {
    const classDateTime = getClassDateTime();

    if (!classDateTime) {
      return false;
    }

    const now = new Date();

    const hoursRemaining =
      (classDateTime.getTime() - now.getTime()) /
      (1000 * 60 * 60);

    return hoursRemaining > 24;
  };

  const handleUpdate = async () => {
    if (!booking) {
      return;
    }

    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    if (selectedSlot === booking.selectedSlot) {
      toast.info("You are already using this time slot");
      return;
    }

    if (!isChangeAllowed()) {
      toast.error(
        "Time slot changes are allowed only before 24 hours of the class."
      );
      return;
    }

    try {
      setUpdating(true);

      const response = await api.put(
        `/bookings/change-slot/${id}`,
        {
          selectedSlot,
        }
      );

      toast.success(
        response.data?.message ||
          "Time slot updated successfully"
      );

      navigate("/dashboard/bookings");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to change time slot"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center flex flex-col gap-3">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <h2 className="text-xl font-semibold text-gray-700">
            Loading booking...
          </h2>
        </div>
      </div>
    );
  }

  if (!booking || error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-red-500">
            {error || "Booking not found"}
          </h2>

          <button
            onClick={() =>
              navigate("/dashboard/bookings")
            }
            className="min-h-11 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  const changeAllowed = isChangeAllowed();

  return (
    <div className="w-full max-w-3xl flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Change Time Slot
        </h1>

        <p className="text-gray-500">
          Select another available time slot for your
          booking.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-8">
        <div className="bg-gray-50 border border-gray-200 rounded-xl flex flex-col gap-3">
          <p>
            <strong>Class:</strong>{" "}
            {booking.class?.title || "Not Available"}
          </p>

          <p>
            <strong>Trainer:</strong>{" "}
            {booking.trainer?.name ||
              booking.class?.trainer?.name ||
              "Not Assigned"}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {booking.class?.date || "Not Available"}
          </p>

          <p>
            <strong>Current Slot:</strong>{" "}
            <span className="font-semibold text-blue-600">
              {booking.selectedSlot || "Not Selected"}
            </span>
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className="font-semibold text-green-600">
              {booking.bookingStatus || "N/A"}
            </span>
          </p>
        </div>

        {!changeAllowed && (
          <div className="bg-red-50 border border-red-200 rounded-xl min-h-24 flex flex-col justify-center gap-2">
            <h3 className="font-bold text-red-600">
              Schedule Cannot Be Changed
            </h3>

            <p className="text-red-500">
              Time slot changes are allowed only before
              24 hours of the class.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-900">
            Available Time Slots
          </h2>

          {timeSlots.length === 0 ? (
            <div className="border border-red-200 bg-red-50 rounded-xl min-h-20 flex items-center">
              <p className="text-red-600 font-semibold">
                No time slots are available for this
                class.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {timeSlots.map((slot, index) => {
                const isCurrentSlot =
                  slot === booking.selectedSlot;

                const isSelected =
                  slot === selectedSlot;

                return (
                  <label
                    key={`${slot}-${index}`}
                    className={`min-h-14 flex items-center justify-between gap-3 border rounded-xl cursor-pointer transition ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="timeSlot"
                        value={slot}
                        checked={isSelected}
                        disabled={!changeAllowed}
                        onChange={(e) =>
                          setSelectedSlot(
                            e.target.value
                          )
                        }
                        className="accent-blue-600"
                      />

                      <span className="font-medium text-gray-800">
                        {slot}
                      </span>
                    </div>

                    {isCurrentSlot && (
                      <span className="text-sm text-blue-600 font-semibold">
                        Current
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/bookings")
            }
            className="min-h-11 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition flex items-center justify-center"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpdate}
            disabled={
              updating ||
              !changeAllowed ||
              timeSlots.length === 0 ||
              !selectedSlot ||
              selectedSlot === booking.selectedSlot
            }
            className={`min-h-11 rounded-lg text-white font-semibold transition flex items-center justify-center ${
              updating ||
              !changeAllowed ||
              timeSlots.length === 0 ||
              !selectedSlot ||
              selectedSlot === booking.selectedSlot
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {updating
              ? "Updating..."
              : "Update Time Slot"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeSlot;