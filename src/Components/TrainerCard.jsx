import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function TrainerCard({ trainer }) {

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

      <img
        src={
          trainer.profileImage ||
          "/default-trainer.jpg"
        }
        alt={trainer.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {trainer.name}
        </h2>

        <p className="text-gray-600 mt-2">
          {trainer.specialization}
        </p>

        <p className="mt-2">
          Experience: {trainer.experience} years
        </p>

        <p className="mt-2">
          Qualification: {trainer.qualification}
        </p>

        <p className="mt-2">
          ⭐ {trainer.rating || 0}
        </p>

        <p className="text-gray-600 mt-3">
          {trainer.bio}
        </p>

      </div>

    </div>
  );
}

export default TrainerCard;