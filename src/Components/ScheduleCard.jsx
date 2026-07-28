import { useNavigate } from "react-router-dom";

function ScheduleCard({ schedule }) {

  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-xl p-5">

      <h2 className="text-2xl font-bold">
        {schedule.className}
      </h2>

      <p>Trainer : {schedule.trainer}</p>

      <p>Day : {schedule.day}</p>

      <p>Date : {schedule.date}</p>

      <p>Time : {schedule.time}</p>

      <p>Duration : {schedule.duration}</p>

      <p>Seats Available : {schedule.availableSeats}</p>

       <p>Platform : {schedule.meetingPlatform}</p>

     

  

      <button
        onClick={() => navigate(`/dashboard/classes/${schedule.classId}`)}
        className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        View Class
      </button>

    </div>
  );
}

export default ScheduleCard;