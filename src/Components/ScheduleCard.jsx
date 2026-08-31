import { useNavigate } from "react-router-dom";

function ScheduleCard({ schedule }) {

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg p-5">

      <h2 className="text-xl font-bold">
        {schedule.class?.title}
      </h2>

      <p className="mt-2">
        <strong>Category:</strong>{" "}
        {schedule.class?.category}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {schedule.class?.date}
      </p>

      <p>
        <strong>Slot:</strong>{" "}
        {schedule.selectedSlot}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {schedule.bookingStatus}
      </p>

      <button
        onClick={() =>
          navigate(
            `/dashboard/classes/${schedule._id}`,
            {
              state: {
                fromBookings: true,
              },
            }
          )
        }
        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        View Class
      </button>

    </div>
  );
}

export default ScheduleCard;