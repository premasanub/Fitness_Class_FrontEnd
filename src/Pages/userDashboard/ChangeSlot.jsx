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

        const response = await api.get(`/bookings/${id}`);

        const bookingData = response.data;

        setBooking(bookingData);
        setSelectedSlot(bookingData?.selectedSlot || "");

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
      <div className="w-full min-h-[70vh] flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-5" />

          <h2 className="text-xl font-semibold text-gray-700">
            Loading booking...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait while we load your booking.
          </p>
        </div>
      </div>
    );
  }

  if (!booking || error) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-2xl font-bold">
            !
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            {error || "Booking not found"}
          </h2>

          <p className="text-gray-500 mt-3 mb-6">
            We could not load the requested booking.
          </p>

          <button
            onClick={() =>
              navigate("/dashboard/bookings")
            }
            className="w-full min-h-12 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  const changeAllowed = isChangeAllowed();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Change Time Slot
          </h1>

          <p className="text-gray-500 mt-2">
            Select another available time slot for your
            booking.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

          {/* CARD HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 py-6 text-white">
            <p className="text-blue-100 text-sm font-medium">
              Booking Details
            </p>

            <h2 className="text-2xl font-bold mt-1">
              {booking.class?.title || "Fitness Class"}
            </h2>
          </div>

          <div className="p-6 sm:p-8 flex flex-col gap-8">

            {/* BOOKING INFORMATION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem
                label="Class"
                value={
                  booking.class?.title ||
                  "Not Available"
                }
              />

              <InfoItem
                label="Trainer"
                value={
                  booking.trainer?.name ||
                  booking.class?.trainer?.name ||
                  "Not Assigned"
                }
              />

              <InfoItem
                label="Date"
                value={
                  booking.class?.date ||
                  "Not Available"
                }
              />

              <InfoItem
                label="Current Slot"
                value={
                  booking.selectedSlot ||
                  "Not Selected"
                }
                highlight
              />

              <InfoItem
                label="Status"
                value={
                  booking.bookingStatus || "N/A"
                }
                status
              />
            </div>

            {/* WARNING */}
            {!changeAllowed && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                    !
                  </div>

                  <div>
                    <h3 className="font-bold text-red-700 text-lg">
                      Schedule Cannot Be Changed
                    </h3>

                    <p className="text-red-600 mt-1 leading-6">
                      Time slot changes are allowed
                      only before 24 hours of the
                      class.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SLOTS */}
            <div>
              <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-900">
                  Available Time Slots
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Choose a different slot for your
                  booking.
                </p>
              </div>

              {timeSlots.length === 0 ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <p className="text-red-600 font-semibold">
                    No time slots are available for
                    this class.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {timeSlots.map((slot, index) => {
                    const isCurrentSlot =
                      slot === booking.selectedSlot;

                    const isSelected =
                      slot === selectedSlot;

                    return (
                      <label
                        key={`${slot}-${index}`}
                        className={`flex items-center justify-between gap-4 p-4 border-2 rounded-xl transition ${
                          !changeAllowed
                            ? "cursor-not-allowed opacity-60"
                            : "cursor-pointer"
                        } ${
                          isSelected
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
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
                            className="w-5 h-5 accent-blue-600"
                          />

                          <span className="font-semibold text-gray-800">
                            {slot}
                          </span>
                        </div>

                        {isCurrentSlot && (
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                            Current
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard/bookings")
                }
                className="min-h-12 px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
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
                className={`min-h-12 px-6 py-3 rounded-xl text-white font-semibold transition ${
                  updating ||
                  !changeAllowed ||
                  timeSlots.length === 0 ||
                  !selectedSlot ||
                  selectedSlot === booking.selectedSlot
                    ? "bg-gray-300 cursor-not-allowed"
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
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  highlight,
  status,
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
            : status
            ? "text-green-600"
            : "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default ChangeSlot;