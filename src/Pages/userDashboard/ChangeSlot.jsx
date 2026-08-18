import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Service/api";
import { toast } from "react-toastify";

function ChangeSlot() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "6:00 AM - 7:00 AM",
    "10:00 AM - 11:00 AM",
    "5:00 PM - 6:00 PM",
  ];

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const { data } = await api.get(`/bookings/${id}`);

      setBooking(data);
      setSelectedSlot(data.selectedSlot);

    } catch (error) {
      console.log(error);
      toast.error("Failed to load booking");
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await api.put(`/bookings/change-slot/${id}`, {
        selectedSlot,
      });

      toast.success("Time Slot Updated Successfully");

      navigate("/dashboard/bookings");

    } catch (error) {
  console.log("Full Error:", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
  }

  toast.error(
    error.response?.data?.message || "Something went wrong"
  );
} finally {
      setLoading(false);
    }
  };

  if (!booking) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">

      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Change Time Slot
        </h1>

        <div className="space-y-3">

          <p>
            <strong>Class :</strong>{" "}
            {booking.class ?.title}
          </p>

          <p>
            <strong>Trainer :</strong>{" "}
            {booking.trainer ?.name}
          </p>

          <p>
            <strong>Current Slot :</strong>{" "}
            {booking.selectedSlot}
          </p>

        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Select New Time Slot
        </h2>

        <div className="space-y-3">

          {timeSlots.map((slot) => (

            <label
              key={slot}
              className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-100"
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

              {slot}

            </label>

          ))}

        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          {loading
            ? "Updating..."
            : "Update Time Slot"}
        </button>

      </div>

    </div>
  );
}

export default ChangeSlot;