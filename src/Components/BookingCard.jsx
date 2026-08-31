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
  // Cancel Booking (Console removed)
  // ================================
  const handleCancel = async () => {
    try {
      await api.put(`/bookings/cancel/${booking._id}`);
      toast.success("Booking Cancelled Successfully");
      window.location.reload();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error cancelling booking"
      );
    }
  };

  // ================================
  // View Details
  // ================================
  const handleViewDetails = () => {
    navigate(`/dashboard/classes/${booking.class?._id}`, {
      state: { fromBookings: true },
    });
  };

  // ================================
  // Give Feedback
  // ================================
  const handleFeedback = () => {
    navigate("/dashboard/feedback", {
      state: { bookingId: booking._id },
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden m-0 p-0">

      {/* Class Image */}
      <img
        src={classImages[booking.class?.image] || strength}
        alt={booking.class?.title}
        className="w-full h-52 object-cover m-0 p-0"
      />

      <div className="m-0 p-0">

        {/* Class Name */}
        <h2 className="text-2xl font-bold m-0 p-0">
          {booking.class?.title}
        </h2>

        {/* Trainer */}
        <p className="m-0 p-0">
          <strong>Trainer:</strong>{" "}
          {booking.trainer?.name || booking.class?.trainer?.name || "Not Assigned"}
        </p>

        {/* Date */}
        <p className="m-0 p-0">
          <strong>Date:</strong> {booking.class?.date}
        </p>

        {/* Time Slot */}
        <p className="m-0 p-0">
          <strong>Time Slot:</strong> {booking.selectedSlot || booking.class?.time}
        </p>

        {/* Payment */}
        <p className="m-0 p-0">
          <strong>Payment:</strong>{" "}
          <span
            className={`font-semibold m-0 p-0 ${
              booking.paymentStatus === "Paid" ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {booking.paymentStatus}
          </span>
        </p>

        {/* Booking Status */}
        <p className="m-0 p-0">
          <strong>Status:</strong>{" "}
          <span
            className={`font-semibold m-0 p-0 ${
              booking.bookingStatus === "Confirmed"
                ? "text-green-600"
                : booking.bookingStatus === "Completed"
                ? "text-blue-600"
                : booking.bookingStatus === "Cancelled"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {booking.bookingStatus}
          </span>
        </p>

        {/* Buttons Container */}
        <div className="flex flex-wrap m-0 p-0">

          {/* View Details */}
          <button
            onClick={handleViewDetails}
            className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 m-0 p-0"
          >
            View Details
          </button>

          {/* Confirmed Booking */}
          {booking.bookingStatus === "Confirmed" && (
            <>
              {/* Change Slot */}
              <button
                onClick={() => navigate(`/dashboard/change-slot/${booking._id}`)}
                className="bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 m-0 p-0"
              >
                Change Slot
              </button>

              {/* Cancel */}
              <button
                onClick={handleCancel}
                className="bg-red-600 text-white rounded-lg hover:bg-red-700 m-0 p-0"
              >
                Cancel Booking
              </button>
            </>
          )}

          {/* Completed Booking */}
          {booking.bookingStatus === "Completed" && (
            booking.feedbackGiven === true ? (
              <span className="bg-green-100 text-green-700 rounded-lg font-semibold flex items-center m-0 p-0">
                ✓ Feedback Submitted!
              </span>
            ) : (
              <button
                onClick={handleFeedback}
                className="bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 m-0 p-0"
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