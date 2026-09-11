

import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../Service/api";

const getStoredUser = () => {
  try {
    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [trainerRating, setTrainerRating] =
    useState(0);

  const [classRating, setClassRating] = useState(0);

  const [trainerFeedback, setTrainerFeedback] =
    useState("");

  const [classFeedback, setClassFeedback] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setFetching(true);

        const user = getStoredUser();

        if (!user?._id) {
          toast.error(
            "User information not found. Please login again."
          );
          return;
        }

        const response = await api.get(
          `/bookings/user/${user._id}`
        );

        const bookingList = Array.isArray(
          response.data
        )
          ? response.data
          : [];

        const completedBookings =
          bookingList.filter(
            (booking) =>
              booking.bookingStatus ===
                "Completed" &&
              booking.feedbackGiven !== true &&
              booking.class
          );

        setBookings(completedBookings);

        if (location.state?.bookingId) {
          const booking =
            completedBookings.find(
              (item) =>
                item._id ===
                location.state.bookingId
            );

          if (booking) {
            setSelectedBooking(booking);
          }
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load completed bookings."
        );
      } finally {
        setFetching(false);
      }
    };

    fetchBookings();
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBooking) {
      toast.error("Please select a class.");
      return;
    }

    if (trainerRating === 0) {
      toast.error("Please give trainer rating.");
      return;
    }

    if (classRating === 0) {
      toast.error("Please give class rating.");
      return;
    }

    try {
      setLoading(true);

      const user = getStoredUser();

      if (!user?._id) {
        toast.error(
          "User information not found. Please login again."
        );
        return;
      }

      const feedbackData = {
        user: user._id,
        booking: selectedBooking._id,
        class: selectedBooking.class?._id,
        trainer:
          selectedBooking.trainer?._id ||
          selectedBooking.trainer,
        trainerRating,
        classRating,
        trainerFeedback,
        classFeedback,
      };

      const response = await api.post(
        "/feedback",
        feedbackData
      );

      if (response.data?.success === false) {
        toast.error(
          response.data?.message ||
            "Failed to submit feedback."
        );
        return;
      }

      toast.success(
        response.data?.message ||
          "Feedback submitted successfully!"
      );

      navigate("/dashboard/bookings");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit feedback."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center flex flex-col gap-3">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <h2 className="text-xl font-semibold text-gray-700">
            Loading feedback...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Class Feedback
        </h1>

        <p className="text-gray-500">
          Share your experience and help us improve.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl border border-gray-100 flex flex-col gap-5">
        <h2 className="text-xl font-bold text-gray-900">
          Select Completed Class
        </h2>

        {bookings.length === 0 ? (
          <div className="min-h-20 bg-gray-50 border border-gray-200 rounded-lg flex items-center">
            <p className="text-gray-500">
              No completed classes are available for
              feedback.
            </p>
          </div>
        ) : (
          <select
            value={selectedBooking?._id || ""}
            onChange={(e) => {
              const booking =
                bookings.find(
                  (item) =>
                    item._id === e.target.value
                );

              setSelectedBooking(
                booking || null
              );
            }}
            className="w-full h-11 border border-gray-300 rounded-lg bg-white indent-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              Select your completed class
            </option>

            {bookings.map((booking) => (
              <option
                key={booking._id}
                value={booking._id}
              >
                {booking.class?.title || "Class"} -{" "}
                {booking.selectedSlot || "Time"}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedBooking && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl border border-gray-100 flex flex-col gap-8"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedBooking.class?.title}
            </h2>

            <p className="text-gray-600">
              Trainer:{" "}
              {selectedBooking.trainer?.name ||
                "Not assigned"}
            </p>

            <p className="text-gray-600">
              Time:{" "}
              {selectedBooking.selectedSlot ||
                "Not available"}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-semibold text-gray-800">
              Trainer Rating
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() =>
                    setTrainerRating(star)
                  }
                  className={`text-3xl transition ${
                    star <= trainerRating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-semibold text-gray-800">
              Trainer Feedback
            </label>

            <textarea
              value={trainerFeedback}
              onChange={(e) =>
                setTrainerFeedback(
                  e.target.value
                )
              }
              placeholder="Write your feedback about the trainer..."
              rows="4"
              className="w-full border border-gray-300 rounded-lg indent-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-semibold text-gray-800">
              Class Rating
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() =>
                    setClassRating(star)
                  }
                  className={`text-3xl transition ${
                    star <= classRating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-semibold text-gray-800">
              Class Feedback
            </label>

            <textarea
              value={classFeedback}
              onChange={(e) =>
                setClassFeedback(
                  e.target.value
                )
              }
              placeholder="Write your feedback about the class..."
              rows="4"
              className="w-full border border-gray-300 rounded-lg indent-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full min-h-12 rounded-lg text-white font-semibold flex items-center justify-center transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? "Submitting..."
              : "Submit Feedback"}
          </button>
        </form>
      )}
    </div>
  );
}

export default Feedback;