import { useNavigate } from "react-router-dom";
import api from "../Service/api";
import { toast } from "react-toastify";

// Import Images
import yoga from "../assets/yoga.jpg";
import zumba from "../assets/zumba.jpg";
import cardio from "../assets/cardio.jpg";
import strength from "../assets/strength.jpg";

function BookingCard({ booking }) {

  const navigate = useNavigate();

  const classImages = {
    "yoga.jpg": yoga,
    "zumba.jpg": zumba,
    "cardio.jpg": cardio,
    "strength.jpg": strength,
  };

  // ================================
  // Cancel Booking
  // ================================

  const handleCancel = async () => {
    try {
      await api.put(
        `/bookings/cancel/${booking._id}`
      );

      toast.success(
        "Booking Cancelled Successfully"
      );

      window.location.reload();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Error cancelling booking"
      );
    }
  };


  // ================================
  // View Details
  // ================================

  const handleViewDetails = () => {
    navigate(
      `/dashboard/classes/${booking.class?._id}`,
      {
        state: {
          fromBookings: true,
        },
      }
    );
  };


  // ================================
  // Give Feedback
  // ================================

  const handleFeedback = () => {
    navigate(
      "/dashboard/feedback",
      {
        state: {
          bookingId: booking._id,
        },
      }
    );
  };


  return (
    <div className="bg-white">

      {/* ================================
          Class Image
      ================================= */}
      <img
        src={
          classImages[booking.class?.image] ||
          strength
        }
        alt={booking.class?.title}
        className="w-full h-52 object-cover"
      />

      <div>

        {/* ================================
            Class Name
        ================================= */}
        <h2 className="text-2xl font-bold">
          {booking.class?.title}
        </h2>


        {/* ================================
            Trainer
        ================================= */}
        <p>
          <strong>Trainer:</strong>{" "}
          {booking.trainer?.name ||
            booking.class?.trainer?.name ||
            "Not Assigned"}
        </p>


        {/* ================================
            Date
        ================================= */}
        <p>
          <strong>Date:</strong>{" "}
          {booking.class?.date}
        </p>


        {/* ================================
            Time Slot
        ================================= */}
        <p>
          <strong>Time Slot:</strong>{" "}
          {booking.selectedSlot ||
            booking.class?.time}
        </p>


        {/* ================================
            Payment
        ================================= */}
        <p>
          <strong>Payment:</strong>{" "}
          <span
            className={`font-semibold ${
              booking.paymentStatus === "Paid"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {booking.paymentStatus}
          </span>
        </p>


        {/* ================================
            Booking Status
        ================================= */}
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`font-semibold ${
              booking.bookingStatus ===
              "Confirmed"
                ? "text-green-600"
                : booking.bookingStatus ===
                  "Completed"
                ? "text-blue-600"
                : booking.bookingStatus ===
                  "Cancelled"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {booking.bookingStatus}
          </span>
        </p>


        {/* ================================
            Buttons (No gap, no margin)
        ================================= */}
        <div className="flex flex-wrap">

          {/* View Details */}
          <button
            onClick={handleViewDetails}
            className="bg-blue-600 text-white"
          >
            View Details
          </button>


          {/* ================================
              Confirmed Booking
          ================================= */}
          {booking.bookingStatus ===
            "Confirmed" && (
            <>
              {/* Change Slot */}
              <button
                onClick={() =>
                  navigate(
                    `/dashboard/change-slot/${booking._id}`
                  )
                }
                className="bg-indigo-600 text-white"
              >
                Change Slot
              </button>

              {/* Cancel */}
              <button
                onClick={handleCancel}
                className="bg-red-600 text-white"
              >
                Cancel Booking
              </button>
            </>
          )}


          {/* ================================
              Completed Booking
          ================================= */}
          {booking.bookingStatus ===
            "Completed" && (
            booking.feedbackGiven === true ? (
              <span className="bg-green-100 text-green-700 font-semibold flex items-center">
                ✓ Feedback Submitted!
              </span>
            ) : (
              <button
                onClick={handleFeedback}
                className="bg-yellow-500 text-white"
              >
                Give Feedback
              </button>
            )
          )}

        </div>

      </div>
    </div>
  );
}

export default BookingCard;
