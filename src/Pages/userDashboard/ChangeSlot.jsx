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

  // =====================================
  // FETCH BOOKING
  // =====================================
  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/bookings/${id}`);

      console.log("BOOKING RESPONSE:", response.data);

      const bookingData = response.data;

      setBooking(bookingData);

      // Current selected slot
      setSelectedSlot(
        bookingData.selectedSlot || ""
      );

      // =====================================
      // GET TIME SLOTS FROM BACKEND
      // =====================================

      const backendSlots =
        bookingData.class?.timeSlots || [];

      console.log(
        "TIME SLOTS FROM BACKEND:",
        backendSlots
      );

      setTimeSlots(backendSlots);

    } catch (error) {
      console.error(
        "FETCH BOOKING ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load booking"
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // UPDATE SLOT
  // =====================================
  const handleUpdate = async () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    // Same slot selected
    if (selectedSlot === booking.selectedSlot) {
      toast.info("You are already using this time slot");
      return;
    }

    try {
      setUpdating(true);

      console.log(
        "Updating slot:",
        selectedSlot
      );

      const response = await api.put(
        `/bookings/change-slot/${id}`,
        {
          selectedSlot,
        }
      );

      console.log(
        "CHANGE SLOT RESPONSE:",
        response.data
      );

      toast.success(
        response.data.message ||
          "Time slot updated successfully"
      );

      // Go back to bookings
      navigate("/dashboard/bookings");

    } catch (error) {
      console.error(
        "CHANGE SLOT ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to change time slot"
      );

    } finally {
      setUpdating(false);
    }
  };

  // =====================================
  // LOADING
  // =====================================
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">

          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>

          <h2 className="text-xl font-semibold">
            Loading booking...
          </h2>

        </div>
      </div>
    );
  }

  // =====================================
  // BOOKING NOT FOUND
  // =====================================
  if (!booking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">

        <div className="text-center">

          <h2 className="text-2xl font-bold text-red-500">
            Booking not found
          </h2>

          <button
            onClick={() =>
              navigate("/dashboard/bookings")
            }
            className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Bookings
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* =====================================
          CARD
      ===================================== */}

      <div className="bg-white rounded-2xl shadow-xl p-8">

        {/* TITLE */}

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Change Time Slot
        </h1>

        {/* =====================================
            BOOKING DETAILS
        ===================================== */}

        <div className="bg-gray-50 border rounded-xl p-5 space-y-3">

          <p>
            <strong>Class:</strong>{" "}
            {booking.class?.title ||
              "Not Available"}
          </p>

          <p>
            <strong>Trainer:</strong>{" "}
            {booking.trainer?.name ||
              booking.class?.trainer?.name ||
              "Not Assigned"}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {booking.class?.date ||
              "Not Available"}
          </p>

          <p>
            <strong>Current Slot:</strong>{" "}
            <span className="font-semibold text-blue-600">
              {booking.selectedSlot ||
                "Not Selected"}
            </span>
          </p>

          <p>
            <strong>Booking Status:</strong>{" "}
            <span className="text-green-600 font-semibold">
              {booking.bookingStatus}
            </span>
          </p>

        </div>

        {/* =====================================
            AVAILABLE SLOTS
        ===================================== */}

        <h2 className="text-xl font-bold mt-8 mb-4">
          Available Time Slots
        </h2>

        {timeSlots.length === 0 ? (

          <div className="border border-red-300 bg-red-50 rounded-xl p-5">

            <p className="text-red-600 font-semibold">
              No time slots are available for this class.
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {timeSlots.map((slot, index) => {

              const isCurrentSlot =
                slot === booking.selectedSlot;

              const isSelected =
                slot === selectedSlot;

              return (
                <label
                  key={`${slot}-${index}`}
                  className={`flex items-center justify-between border rounded-xl p-4 transition ${
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
                      onChange={(e) =>
                        setSelectedSlot(
                          e.target.value
                        )
                      }
                      className="w-4 h-4"
                    />

                    <span className="font-medium">
                      {slot}
                    </span>

                  </div>

                  {isCurrentSlot && (
                    <span className="text-sm text-blue-600 font-semibold">
                      Current Slot
                    </span>
                  )}

                </label>
              );
            })}

          </div>
        )}

        {/* =====================================
            BUTTONS
        ===================================== */}

        <div className="flex gap-4 mt-8">

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/bookings")
            }
            className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpdate}
            disabled={
              updating ||
              timeSlots.length === 0 ||
              !selectedSlot ||
              selectedSlot === booking.selectedSlot
            }
            className={`flex-1 py-3 rounded-lg text-white font-semibold ${
              updating ||
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