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
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-5" />

          <h2 className="text-xl font-semibold text-gray-700">
            Loading feedback...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait while we load your completed
            classes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Class Feedback
          </h1>

          <p className="text-gray-500 mt-2">
            Share your experience and help us improve.
          </p>
        </div>

        {/* SELECT CLASS */}
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6 sm:p-7 mb-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              Select Completed Class
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Choose a completed class to leave your
              feedback.
            </p>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
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
              className="w-full h-12 px-4 border border-gray-300 rounded-xl bg-white text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

        {/* FORM */}
        {selectedBooking && (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-2xl border border-gray-100 p-6 sm:p-8 flex flex-col gap-8"
          >
            {/* CLASS INFO */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedBooking.class?.title}
              </h2>

              <div className="mt-3 flex flex-col gap-1">
                <p className="text-gray-600">
                  <span className="font-semibold">
                    Trainer:
                  </span>{" "}
                  {selectedBooking.trainer?.name ||
                    "Not assigned"}
                </p>

                <p className="text-gray-600">
                  <span className="font-semibold">
                    Time:
                  </span>{" "}
                  {selectedBooking.selectedSlot ||
                    "Not available"}
                </p>
              </div>
            </div>

            {/* TRAINER RATING */}
            <RatingSection
              label="Trainer Rating"
              rating={trainerRating}
              setRating={setTrainerRating}
            />

            {/* TRAINER FEEDBACK */}
            <FeedbackTextarea
              label="Trainer Feedback"
              value={trainerFeedback}
              onChange={(e) =>
                setTrainerFeedback(
                  e.target.value
                )
              }
              placeholder="Write your feedback about the trainer..."
            />

            {/* CLASS RATING */}
            <RatingSection
              label="Class Rating"
              rating={classRating}
              setRating={setClassRating}
            />

            {/* CLASS FEEDBACK */}
            <FeedbackTextarea
              label="Class Feedback"
              value={classFeedback}
              onChange={(e) =>
                setClassFeedback(
                  e.target.value
                )
              }
              placeholder="Write your feedback about the class..."
            />

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full min-h-12 px-6 py-3 rounded-xl text-white font-semibold flex items-center justify-center transition ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
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
    </div>
  );
}

function RatingSection({
  label,
  rating,
  setRating,
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-semibold text-gray-800">
        {label}
      </label>

      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            className={`w-10 h-10 rounded-lg text-2xl transition ${
              star <= rating
                ? "text-yellow-400 bg-yellow-50"
                : "text-gray-300 bg-gray-50 hover:bg-gray-100"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500">
        {rating === 0
          ? "Select a rating"
          : `${rating} out of 5`}
      </p>
    </div>
  );
}

function FeedbackTextarea({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-semibold text-gray-800">
        {label}
      </label>

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="4"
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
      />
    </div>
  );
}

export default Feedback;