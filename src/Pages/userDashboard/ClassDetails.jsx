import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import api from "../../Service/api";

import yoga from "../../assets/yoga.jpg";
import zumba from "../../assets/zumba.jpg";
import cardio from "../../assets/cardio.jpg";
import strength from "../../assets/strength.jpg";

function ClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const fromBookings = location.state?.fromBookings || false;

  const [selectedClass, setSelectedClass] = useState(null);
  const [booking, setBooking] = useState(null);

  const [showSlots, setShowSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [loading, setLoading] = useState(true);
  const [changingSlot, setChangingSlot] = useState(false);

  const classImages = {
    "yoga.jpg": yoga,
    "zumba.jpg": zumba,
    "cardio.jpg": cardio,
    "strength.jpg": strength,
  };

  useEffect(() => {
    fetchDetails();
  }, [id, fromBookings]);

  const fetchDetails = async () => {
    try {
      setLoading(true);

      if (fromBookings) {
        const response = await api.get(`/bookings/${id}`);

        console.log("BOOKING DETAILS:", response.data);

        setBooking(response.data);
        setSelectedClass(response.data.class);
      } else {
        const response = await api.get(`/classes/${id}`);

        console.log("CLASS DETAILS:", response.data);

        setSelectedClass(
          response.data.class || response.data
        );
      }
    } catch (error) {
      console.log(
        "DETAILS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Check slot change allowed
  // --------------------------------
  const isChangeAllowed = () => {
    if (!selectedClass?.date || !selectedClass?.time) {
      return false;
    }

    const classDateTime = new Date(
      `${selectedClass.date}T${selectedClass.time}`
    );

    const now = new Date();

    const difference =
      classDateTime.getTime() - now.getTime();

    const hoursRemaining =
      difference / (1000 * 60 * 60);

    return hoursRemaining > 24;
  };

  // --------------------------------
  // Change Slot
  // --------------------------------
  const handleChangeSlot = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }

    try {
      setChangingSlot(true);

      const response = await api.put(
        `/bookings/change-slot/${booking._id}`,
        {
          selectedSlot,
        }
      );

      console.log(
        "CHANGE SLOT RESPONSE:",
        response.data
      );

      alert("Time slot changed successfully!");

      setBooking(response.data.booking);

      setShowSlots(false);
      setSelectedSlot("");

    } catch (error) {
      console.log(
        "CHANGE SLOT ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Unable to change time slot"
      );
    } finally {
      setChangingSlot(false);
    }
  };

  // --------------------------------
  // Loading
  // --------------------------------
  if (loading) {
    return (
      <h2 className="text-center text-3xl mt-20">
        Loading...
      </h2>
    );
  }

  // --------------------------------
  // Class not found
  // --------------------------------
  if (!selectedClass) {
    return (
      <div className="text-center mt-20">

        <h2 className="text-2xl font-bold text-red-500">
          Class details not found
        </h2>

        <button
          onClick={() =>
            navigate("/dashboard/classes")
          }
          className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Back to Classes
        </button>

      </div>
    );
  }

  // --------------------------------
  // Seats
  // --------------------------------
  const seatsAvailable = Number(
    selectedClass.seats || 0
  );

  // --------------------------------
  // Time slots
  // --------------------------------
  const timeSlots = [
    selectedClass.time,
    "10:00",
    "14:00",
    "17:00",
  ];

  const canChange =
    fromBookings && isChangeAllowed();

  return (
    <div className="max-w-5xl mx-auto p-8">

      {/* Image */}
      <img
        src={
          classImages[selectedClass.image] ||
          strength
        }
        alt={selectedClass.title}
        className="w-full h-96 object-cover rounded-xl"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold mt-6">
        {selectedClass.title}
      </h1>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

        <p>
          <strong>Trainer:</strong>{" "}
          {selectedClass.trainer?.name ||
            booking?.trainer?.name ||
            "Not assigned"}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {selectedClass.category}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {selectedClass.date}
        </p>

        <p>
          <strong>Time:</strong>{" "}
          {selectedClass.time}
        </p>

        <p>
          <strong>Duration:</strong>{" "}
          {selectedClass.duration} mins
        </p>

        <p>
          <strong>Price:</strong>{" "}
          ₹{selectedClass.price}
        </p>

        <p>
          <strong>Seats Available:</strong>{" "}

          <span
            className={
              seatsAvailable > 0
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {seatsAvailable}
          </span>
        </p>

        {booking && (
          <p>
            <strong>Booked Slot:</strong>{" "}
            {booking.selectedSlot}
          </p>
        )}

        {booking && (
          <p>
            <strong>Booking Status:</strong>{" "}
            <span className="text-green-600 font-semibold">
              {booking.bookingStatus}
            </span>
          </p>
        )}

      </div>

      {/* Description */}
      <p className="mt-6 text-gray-700">
        {selectedClass.description}
      </p>

      {/* ================================= */}
      {/* BOOKED CLASS */}
      {/* ================================= */}

      {fromBookings ? (

        <div className="mt-8">

          {/* Meeting */}
          {selectedClass.meetingLink && (
            <a
              href={selectedClass.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Join Meeting
            </a>
          )}

          {/* Change Slot */}
          {canChange ? (

            <>
              {!showSlots ? (

                <button
                  onClick={() =>
                    setShowSlots(true)
                  }
                  className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Change Slot
                </button>

              ) : (

                <div className="border rounded-xl p-6 bg-gray-50 mt-6">

                  <h2 className="text-xl font-bold mb-5">
                    Select New Time Slot
                  </h2>

                  <div className="space-y-3">

                    {timeSlots.map(
                      (slot, index) => (

                        <label
                          key={index}
                          className="flex items-center gap-3 border p-4 rounded-lg bg-white cursor-pointer hover:bg-gray-100"
                        >

                          <input
                            type="radio"
                            name="newSlot"
                            value={slot}
                            checked={
                              selectedSlot === slot
                            }
                            onChange={(e) =>
                              setSelectedSlot(
                                e.target.value
                              )
                            }
                          />

                          {slot}

                        </label>

                      )
                    )}

                  </div>

                  <div className="flex gap-3 mt-6">

                    <button
                      onClick={
                        handleChangeSlot
                      }
                      disabled={
                        !selectedSlot ||
                        changingSlot
                      }
                      className={`px-6 py-3 rounded-lg text-white ${
                        selectedSlot &&
                        !changingSlot
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {changingSlot
                        ? "Changing..."
                        : "Confirm New Slot"}
                    </button>

                    <button
                      onClick={() => {
                        setShowSlots(false);
                        setSelectedSlot("");
                      }}
                      className="px-6 py-3 rounded-lg border"
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              )}

            </>

          ) : (

            <div className="bg-red-50 border border-red-300 rounded-lg p-5 mt-6">

              <h3 className="text-lg font-bold text-red-600">
                Schedule cannot be changed
              </h3>

              <p className="text-red-500 mt-2">
                Time slot changes are allowed only
                before 24 hours of the class.
              </p>

            </div>

          )}

        </div>

      ) : (

        /* ================================= */
        /* NORMAL CLASS */
        /* ================================= */

        <div className="mt-8">

          {seatsAvailable <= 0 ? (

            <div>

              <div className="bg-red-50 border border-red-300 rounded-lg p-5 mb-4">

                <h3 className="text-lg font-bold text-red-600">
                  Class Full
                </h3>

                <p className="text-red-500 mt-1">
                  Sorry, there are no available seats
                  for this class.
                </p>

              </div>

              <button
                disabled
                className="bg-gray-400 text-white px-6 py-3 rounded-lg cursor-not-allowed"
              >
                No Seats Available
              </button>

            </div>

          ) : (

            <button
              onClick={() =>
                navigate(
                  `/dashboard/booking/${selectedClass._id}`
                )
              }
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Book Now
            </button>

          )}

        </div>

      )}

    </div>
  );
}

export default ClassDetails;