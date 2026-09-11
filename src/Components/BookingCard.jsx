
import { useNavigate } from "react-router-dom";
import api from "../Service/api";
import { toast } from "react-toastify";

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

  const handleCancel = async () => {
    try {
      await api.put(`/bookings/cancel/${booking._id}`);

      toast.success("Booking cancelled successfully");

      window.location.reload();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to cancel booking"
      );
    }
  };

  const handleViewDetails = () => {
    if (!booking.class?._id) {
      toast.error("Class details are unavailable");
      return;
    }

    navigate(`/dashboard/classes/${booking.class._id}`, {
      state: {
        fromBookings: true,
      },
    });
  };

  const handleFeedback = () => {
    navigate("/dashboard/feedback", {
      state: {
        bookingId: booking._id,
      },
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "text-green-600";

      case "Completed":
        return "text-blue-600";

      case "Cancelled":
        return "text-red-600";

      default:
        return "text-yellow-600";
    }
  };

  const getPaymentColor = (status) => {
    return status === "Paid"
      ? "text-green-600"
      : "text-yellow-600";
  };

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full">

      {/* Class Image */}
      <img
        src={
          classImages[booking.class?.image] ||
          strength
        }
        alt={booking.class?.title || "Fitness class"}
        className="w-full h-52 object-cover"
      />

      {/* Card Content */}
      <div className="flex flex-col gap-4 flex-1">

        {/* Class Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          {booking.class?.title || "Fitness Class"}
        </h2>

        {/* Booking Information */}
        <div className="flex flex-col gap-2 text-gray-700">

          <p>
            <span className="font-semibold">
              Trainer:
            </span>{" "}
            {booking.trainer?.name ||
              booking.class?.trainer?.name ||
              "Not Assigned"}
          </p>

          <p>
            <span className="font-semibold">
              Date:
            </span>{" "}
            {booking.class?.date || "Not Available"}
          </p>

          <p>
            <span className="font-semibold">
              Time Slot:
            </span>{" "}
            {booking.selectedSlot ||
              booking.class?.time ||
              "Not Available"}
          </p>

          <p>
            <span className="font-semibold">
              Payment:
            </span>{" "}
            <span
              className={`font-semibold ${getPaymentColor(
                booking.paymentStatus
              )}`}
            >
              {booking.paymentStatus || "Pending"}
            </span>
          </p>

          <p>
            <span className="font-semibold">
              Status:
            </span>{" "}
            <span
              className={`font-semibold ${getStatusColor(
                booking.bookingStatus
              )}`}
            >
              {booking.bookingStatus || "Pending"}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">

          {/* View Details */}
          <button
            type="button"
            onClick={handleViewDetails}
            className="bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            View Details
          </button>

          {/* Confirmed Booking Actions */}
          {booking.bookingStatus === "Confirmed" && (
            <>
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/dashboard/change-slot/${booking._id}`
                  )
                }
                className="bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Change Slot
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
              >
                Cancel Booking
              </button>
            </>
          )}

          {/* Completed Booking */}
          {booking.bookingStatus === "Completed" && (
            booking.feedbackGiven ? (
              <span className="bg-green-100 text-green-700 rounded-lg font-semibold flex items-center">
                ✓ Feedback Submitted
              </span>
            ) : (
              <button
                type="button"
                onClick={handleFeedback}
                className="bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition"
              >
                Give Feedback
              </button>
            )
          )}
        </div>
      </div>
    </article>
  );
}

export default BookingCard;

