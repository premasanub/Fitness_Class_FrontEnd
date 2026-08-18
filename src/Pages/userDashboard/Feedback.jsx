import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../Service/api";

function Feedback() {

  const location = useLocation();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [trainerRating, setTrainerRating] = useState(0);
  const [classRating, setClassRating] = useState(0);

  const [trainerFeedback, setTrainerFeedback] = useState("");
  const [classFeedback, setClassFeedback] = useState("");

  const [loading, setLoading] = useState(false);

  // ================================
  // Fetch completed bookings
  // ================================

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user?._id) {
        console.log("User not found");
        return;
      }

      const response = await api.get(
        `/bookings/user/${user._id}`
      );

      console.log(
        "FEEDBACK BOOKINGS:",
        response.data
      );

      const completedBookings = response.data.filter(
        (booking) =>
          booking.bookingStatus === "Completed" &&
          booking.feedbackGiven !== true &&
          booking.class
      );

      setBookings(completedBookings);

      // If redirected from MyBookings
      if (location.state?.bookingId) {

        const booking = completedBookings.find(
          (item) =>
            item._id === location.state.bookingId
        );

        if (booking) {
          setSelectedBooking(booking);
        }
      }

    } catch (error) {

      console.log(
        "FETCH BOOKINGS ERROR:",
        error.response?.data || error.message
      );

    }
  };

  // ================================
  // Submit Feedback
  // ================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!selectedBooking) {
      alert("Please select a class.");
      return;
    }

    if (trainerRating === 0) {
      alert("Please give trainer rating.");
      return;
    }

    if (classRating === 0) {
      alert("Please give class rating.");
      return;
    }

    try {

      setLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const feedbackData = {

        user: user._id,

        booking: selectedBooking._id,

        class: selectedBooking.class._id,

        trainer:
          selectedBooking.trainer?._id ||
          selectedBooking.trainer,

        trainerRating: trainerRating,

        classRating: classRating,

        trainerFeedback: trainerFeedback,

        classFeedback: classFeedback,
      };

      console.log(
        "FEEDBACK DATA:",
        feedbackData
      );

      const response = await api.post(
        "/feedback",
        feedbackData
      );

      console.log(
        "FEEDBACK RESPONSE:",
        response.data
      );

      alert("Feedback submitted successfully!");

      // Go back to bookings
      navigate("/dashboard/bookings");

    } catch (error) {

      console.log(
        "FEEDBACK ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed to submit feedback."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Class Feedback
      </h1>

      {/* ================================
          Select Class
      ================================= */}

      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">

        <h2 className="text-xl font-bold mb-4">
          Select Completed Class
        </h2>

        {bookings.length === 0 ? (

          <p className="text-gray-500">
            No completed classes available for feedback.
          </p>

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
            className="w-full border p-3 rounded-lg"
          >

            <option value="">
              -- Select your completed class --
            </option>

            {bookings.map((booking) => (

              <option
                key={booking._id}
                value={booking._id}
              >
                {booking.class?.title} -{" "}
                {booking.selectedSlot}
              </option>

            ))}

          </select>

        )}

      </div>

      {/* ================================
          Feedback Form
      ================================= */}

      {selectedBooking && (

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6"
        >

          {/* Class Information */}

          <div className="mb-6">

            <h2 className="text-2xl font-bold">
              {selectedBooking.class?.title}
            </h2>

            <p className="text-gray-600 mt-2">
              Trainer:{" "}
              {selectedBooking.trainer?.name ||
                "Not assigned"}
            </p>

            <p className="text-gray-600">
              Time:{" "}
              {selectedBooking.selectedSlot}
            </p>

          </div>


          {/* ================================
              Trainer Rating
          ================================= */}

          <div className="mb-6">

            <label className="block font-semibold mb-2">
              Trainer Rating
            </label>

            <div className="flex gap-2">

              {[1, 2, 3, 4, 5].map(
                (star) => (

                  <button
                    type="button"
                    key={star}
                    onClick={() =>
                      setTrainerRating(star)
                    }
                    className={`text-3xl ${
                      star <= trainerRating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>

                )
              )}

            </div>

          </div>


          {/* ================================
              Trainer Feedback
          ================================= */}

          <div className="mb-6">

            <label className="block font-semibold mb-2">
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
              className="w-full border rounded-lg p-3"
            />

          </div>


          {/* ================================
              Class Rating
          ================================= */}

          <div className="mb-6">

            <label className="block font-semibold mb-2">
              Class Rating
            </label>

            <div className="flex gap-2">

              {[1, 2, 3, 4, 5].map(
                (star) => (

                  <button
                    type="button"
                    key={star}
                    onClick={() =>
                      setClassRating(star)
                    }
                    className={`text-3xl ${
                      star <= classRating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>

                )
              )}

            </div>

          </div>


          {/* ================================
              Class Feedback
          ================================= */}

          <div className="mb-6">

            <label className="block font-semibold mb-2">
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
              className="w-full border rounded-lg p-3"
            />

          </div>


          {/* ================================
              Submit
          ================================= */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              loading
                ? "bg-gray-400"
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