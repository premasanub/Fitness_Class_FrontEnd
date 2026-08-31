import { useNavigate } from "react-router-dom";

function ScheduleCard({ schedule }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg m-0 p-0">
      <h2 className="text-xl font-bold m-0 p-0">
        {schedule.class?.title}
      </h2>

      <p className="m-0 p-0">
        <strong>Category:</strong> {schedule.class?.category}
      </p>

      <p className="m-0 p-0">
        <strong>Date:</strong> {schedule.class?.date}
      </p>

      <p className="m-0 p-0">
        <strong>Slot:</strong> {schedule.selectedSlot}
      </p>

      <p className="m-0 p-0">
        <strong>Status:</strong> {schedule.bookingStatus}
      </p>

      <button
        onClick={() =>
          navigate(`/dashboard/classes/${schedule._id}`, {
            state: { fromBookings: true },
          })
        }
        className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 m-0 p-0"
      >
        View Class
      </button>
    </div>
  );
}

export default ScheduleCard;
