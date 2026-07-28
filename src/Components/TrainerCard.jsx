import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function TrainerCard({ trainer }) {
console.log(trainer);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl duration-300">

      <img
        src={trainer.image}
        alt={trainer.name}
        className="w-full h-72 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold">
          {trainer.name}
        </h2>

        <p className="text-gray-600 mt-2">
          {trainer.qualification}
        </p>

        <p>
          Experience : {trainer.experience}
        </p>

        <p>
          Specialization : {trainer.specialization}
        </p>

        <p className="flex items-center gap-2 mt-2 text-yellow-500">
          <FaStar />
          {trainer.rating} ({trainer.reviews} Reviews)
        </p>

        <button
          onClick={() => navigate(`/trainers/${trainer.id}`)}
          className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          View Profile
        </button>

      </div>

    </div>
  );
}

export default TrainerCard;