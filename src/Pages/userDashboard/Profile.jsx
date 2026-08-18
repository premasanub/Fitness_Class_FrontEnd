import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Service/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
  }, []);

  // ===============================
  // FETCH PROFILE + BOOKINGS
  // ===============================
  const fetchProfileData = async () => {
    try {
      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (!storedUser?._id) {
        return;
      }

      // User details
      const userResponse = await api.get(
        `/user/${storedUser._id}`
      );

      setUser(
        userResponse.data.user ||
          userResponse.data
      );

      // User bookings
      const bookingResponse = await api.get(
        `/bookings/user/${storedUser._id}`
      );

      setBookings(bookingResponse.data || []);

    } catch (error) {
      console.log(
        "PROFILE ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // CONVERT SLOT TIME
  // ===============================
  const getClassDateTime = (booking) => {
    if (!booking?.class?.date) {
      return null;
    }

    const date = booking.class.date;

    /*
      Example selectedSlot:

      "10:00 AM - 11:00 AM"
      "5:00 PM - 6:00 PM"
      "16:20"
    */

    let time = booking.selectedSlot;

    if (!time) {
      time = booking.class.time;
    }

    // If slot is range, take starting time
    if (time.includes("-")) {
      time = time.split("-")[0].trim();
    }

    // Convert 12-hour format to 24-hour format
    if (time.includes("AM") || time.includes("PM")) {
      const parts = time.split(" ");

      let clock = parts[0];
      const period = parts[1];

      let [hours, minutes] = clock
        .split(":")
        .map(Number);

      if (period === "PM" && hours !== 12) {
        hours += 12;
      }

      if (period === "AM" && hours === 12) {
        hours = 0;
      }

      time =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0");
    }

    return new Date(
      `${date}T${time}`
    );
  };

  // ===============================
  // CONFIRMED BOOKINGS
  // ===============================
  const confirmedBookings = bookings.filter(
    (booking) =>
      booking.bookingStatus === "Confirmed" ||
      booking.bookingStatus === "Completed"
  );

  // ===============================
  // CURRENT DATE
  // ===============================
  const now = new Date();

  // ===============================
  // UPCOMING BOOKINGS
  // ===============================
  const upcomingBookings =
    confirmedBookings.filter((booking) => {
      const classDateTime =
        getClassDateTime(booking);

      return (
        classDateTime &&
        classDateTime > now
      );
    });

  // ===============================
  // COMPLETED BOOKINGS
  // ===============================
  const completedBookings =
    confirmedBookings.filter((booking) => {
      const classDateTime =
        getClassDateTime(booking);

      return (
        classDateTime &&
        classDateTime <= now
      );
    });

  // ===============================
  // FEEDBACK GIVEN
  // ===============================
  const feedbackGiven =
    completedBookings.filter(
      (booking) =>
        booking.feedbackGiven === true
    );

  // ===============================
  // FEEDBACK PENDING
  // ===============================
  const feedbackPending =
    completedBookings.filter(
      (booking) =>
        booking.feedbackGiven !== true
    );

  // ===============================
  // LOADING
  // ===============================
  if (loading) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">
          Loading Profile...
        </h2>
      </div>
    );
  }

  // ===============================
  // UI
  // ===============================
  return (
    <div className="p-6">

      {/* =========================
          PROFILE HEADER
      ========================== */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <div className="grid md:grid-cols-2 gap-4">

          <p>
            <strong>Name:</strong>{" "}
            {user?.name || "Not Available"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email || "Not Available"}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            {user?.role || "User"}
          </p>

          <p>
            <strong>Total Bookings:</strong>{" "}
            {confirmedBookings.length}
          </p>

        </div>

      </div>


      {/* =========================
          STATISTICS
      ========================== */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        {/* TOTAL */}

        <div className="bg-blue-600 text-white rounded-xl p-6 shadow">

          <h2 className="text-lg">
            Total Bookings
          </h2>

          <p className="text-4xl font-bold mt-2">
            {confirmedBookings.length}
          </p>

        </div>


        {/* UPCOMING */}

        <div className="bg-green-600 text-white rounded-xl p-6 shadow">

          <h2 className="text-lg">
            Upcoming Classes
          </h2>

          <p className="text-4xl font-bold mt-2">
            {upcomingBookings.length}
          </p>

        </div>


        {/* COMPLETED */}

        <div className="bg-purple-600 text-white rounded-xl p-6 shadow">

          <h2 className="text-lg">
            Completed Classes
          </h2>

          <p className="text-4xl font-bold mt-2">
            {completedBookings.length}
          </p>

        </div>


        {/* FEEDBACK */}

        <div className="bg-orange-500 text-white rounded-xl p-6 shadow">

          <h2 className="text-lg">
            Feedback Given
          </h2>

          <p className="text-4xl font-bold mt-2">
            {feedbackGiven.length}
          </p>

        </div>

      </div>


      {/* =========================
          UPCOMING CLASSES
      ========================== */}

      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          Upcoming Classes
        </h2>

        {upcomingBookings.length === 0 ? (

          <p className="text-gray-500">
            No upcoming classes.
          </p>

        ) : (

          <div className="space-y-4">

            {upcomingBookings.map(
              (booking) => (

                <div
                  key={booking._id}
                  className="border rounded-lg p-5"
                >

                  <h3 className="text-xl font-bold">
                    {booking.class?.title}
                  </h3>

                  <p className="mt-2">
                    <strong>Category:</strong>{" "}
                    {booking.class?.category}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {booking.class?.date}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {booking.selectedSlot ||
                      booking.class?.time}
                  </p>

                  <p>
                    <strong>Trainer:</strong>{" "}
                    {booking.trainer?.name ||
                      booking.class?.trainer?.name ||
                      "Not Assigned"}
                  </p>

                  <span className="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Upcoming
                  </span>

                </div>

              )
            )}

          </div>

        )}

      </div>


      {/* =========================
          COMPLETED + FEEDBACK
      ========================== */}

      <div className="bg-white shadow-lg rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          Completed Classes & Feedback
        </h2>

        {completedBookings.length === 0 ? (

          <p className="text-gray-500">
            No completed classes yet.
          </p>

        ) : (

          <div className="space-y-4">

            {completedBookings.map(
              (booking) => (

                <div
                  key={booking._id}
                  className="border rounded-lg p-5"
                >

                  <h3 className="text-xl font-bold">
                    {booking.class?.title}
                  </h3>

                  <p className="mt-2">
                    <strong>Category:</strong>{" "}
                    {booking.class?.category}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {booking.class?.date}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {booking.selectedSlot ||
                      booking.class?.time}
                  </p>

                  <p>
                    <strong>Trainer:</strong>{" "}
                    {booking.trainer?.name ||
                      booking.class?.trainer?.name ||
                      "Not Assigned"}
                  </p>


                  {/* FEEDBACK STATUS */}

                  {booking.feedbackGiven ? (

                    <div className="mt-4">

                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        ✓ Feedback Given
                      </span>

                    </div>

                  ) : (

                    <div className="mt-4">

                      <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                        Feedback Pending
                      </span>

                      <button
                        onClick={() =>
                          navigate(
                            "/dashboard/feedback",
                            {
                              state: {
                                booking,
                              },
                            }
                          )
                        }
                        className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Give Feedback
                      </button>

                    </div>

                  )}

                </div>

              )
            )}

          </div>

        )}

      </div>


      {/* =========================
          FEEDBACK SUMMARY
      ========================== */}

      <div className="bg-gray-50 border rounded-xl p-6 mt-8">

        <h2 className="text-xl font-bold mb-4">
          Feedback Summary
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="bg-green-100 p-4 rounded-lg">

            <p className="text-gray-600">
              Feedback Given
            </p>

            <p className="text-3xl font-bold text-green-700">
              {feedbackGiven.length}
            </p>

          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">

            <p className="text-gray-600">
              Feedback Pending
            </p>

            <p className="text-3xl font-bold text-yellow-700">
              {feedbackPending.length}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;