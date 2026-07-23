import { FaStar } from "react-icons/fa";

function TrainerCard({
  image,
  name,
  specialization,
  experience,
  rating,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      <img
        src={image}
        alt={name}
        className="w-full h-72 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold">
          {name}
        </h2>

        <p className="text-blue-600 font-semibold mt-2">
          {specialization}
        </p>

        <p className="text-gray-600 mt-2">
          {experience}
        </p>

        <div className="flex items-center mt-4">

          <FaStar className="text-yellow-400 mr-2" />

          <span className="font-bold">
            {rating}
          </span>

        </div>

        <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          View Profile
        </button>

      </div>

    </div>
  );
}

export default TrainerCard;