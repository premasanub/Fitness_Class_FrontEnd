import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../Service/api";

import yoga from "../../assets/yoga.jpg";
import zumba from "../../assets/zumba.jpg";
import cardio from "../../assets/cardio.jpg";
import strength from "../../assets/strength.jpg";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(true);

  // Images
  const classImages = {
    "yoga.jpg": yoga,
    "zumba.jpg": zumba,
    "cardio.jpg": cardio,
    "strength.jpg": strength,
  };

  // Fetch class from backend
  useEffect(() => {
    fetchClass();
  }, [id]);

  const fetchClass = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/classes/${id}`);

      console.log("CLASS API RESPONSE:", response.data);

      // Supports both:
      // { class: {...} }
      // OR
      // {...}
      const trainerClass =
        response.data.class || response.data;

      setSelectedClass(trainerClass);

    } catch (error) {
      console.log(
        "FETCH CLASS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      </div>
    );
  }

  // Class not found
  if (!selectedClass) {
    return (
      <div className="p-6 text-center">

        <h2 className="text-2xl font-bold text-red-500">
          Class not found
        </h2>

        <button
          onClick={() => navigate("/dashboard/classes")}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Back to Classes
        </button>

      </div>
    );
  }

  // ⭐ Trainer created slots from backend
  const timeSlots = selectedClass.timeSlots || [];
  const isFull = Number(selectedClass.seats) <= 0;

  // Proceed to payment
  const handleBooking = () => {
  if (Number(selectedClass.seats) <= 0) {
    alert("No seats available for this class.");
    return;
  }

  if (!selectedSlot) {
    alert("Please select a time slot.");
    return;
  }

  navigate("/dashboard/payments", {
    state: {
      classData: selectedClass,
      selectedSlot,
    },
  });
};

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">
        Book Your Class
      </h1>

      {/* Class Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Class Image */}
        <img
          src={
            classImages[selectedClass.image] || strength
          }
          alt={selectedClass.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">

          {/* Class Name */}
          <h2 className="text-3xl font-bold mb-4">
            {selectedClass.title}
          </h2>

          {/* Class Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <p>
              <strong>Trainer:</strong>{" "}
              {selectedClass.trainer?.name || "Not Assigned"}
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
              <strong>Duration:</strong>{" "}
              {selectedClass.duration} mins
            </p>

            <p>
              <strong>Price:</strong>{" "}
              ₹{selectedClass.price}
            </p>

            <p>
              <strong>Seats:</strong>{" "}
              {selectedClass.seats}
            </p>

          </div>

          {/* Available Time Slots */}
          <h2 className="text-xl font-bold mt-8 mb-4">
            Available Time Slots
          </h2>

       {/* Available Time Slots */}
<h2 className="text-xl font-bold mt-8 mb-4">
  Available Time Slots
</h2>

{isFull ? (
  <div className="bg-red-50 border border-red-300 text-red-600 p-5 rounded-lg">
    <h3 className="font-bold text-lg">
      Class Full
    </h3>

    <p className="mt-1">
      No seats are available for this class.
    </p>
  </div>
) : timeSlots.length === 0 ? (
  <p className="text-red-500 border p-4 rounded-lg">
    No time slots available for this class.
  </p>
) : (
  <div className="space-y-3">
    {timeSlots.map((slot, index) => (
      <label
        key={index}
        className={`flex items-center gap-3 border p-4 rounded-lg cursor-pointer transition ${
          selectedSlot === slot
            ? "border-green-500 bg-green-50"
            : "hover:bg-gray-100"
        }`}
      >
        <input
          type="radio"
          name="slot"
          value={slot}
          checked={selectedSlot === slot}
          onChange={(e) =>
            setSelectedSlot(e.target.value)
          }
        />

        <span className="font-medium">
          {slot}
        </span>
      </label>
    ))}
  </div>
)}

          {/* Payment Button */}
          <button
  disabled={
    isFull ||
    !selectedSlot ||
    timeSlots.length === 0
  }
  onClick={handleBooking}
  className={`mt-8 px-6 py-3 rounded-lg text-white ${
    !isFull &&
    selectedSlot &&
    timeSlots.length > 0
      ? "bg-green-600 hover:bg-green-700"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
  {isFull ? "Class Full" : "Proceed to Payment"}
</button>

        </div>
      </div>
    </div>
  );
}

export default Booking;