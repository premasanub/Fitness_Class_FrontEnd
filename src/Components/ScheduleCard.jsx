

import { useNavigate } from "react-router-dom";

function ScheduleCard({ schedule }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col gap-4 min-h-64">
      <h2 className="text-xl font-bold text-gray-900">
        {schedule.class?.title || "Class"}
      </h2>

      <div className="flex flex-col gap-2 text-gray-700">
        <p>
          <strong>Category:</strong>{" "}
          {schedule.class?.category || "N/A"}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {schedule.class?.date || "N/A"}
        </p>

        <p>
          <strong>Slot:</strong>{" "}
          {schedule.selectedSlot || "N/A"}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {schedule.bookingStatus || "N/A"}
        </p>
      </div>

      <button
        onClick={() =>
          navigate(`/dashboard/classes/${schedule._id}`, {
            state: {
              fromBookings: true,
            },
          })
        }
        className="w-full min-h-11 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
      >
        View Class
      </button>
    </div>
  );
}

export default ScheduleCard;