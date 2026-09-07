import { FaClock, FaSignal } from "react-icons/fa";

function PopularClassCard({ item }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      {/* Class Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-56 object-cover"
      />

      {/* Card Content */}
      <div className="p-6">

        <h2 className="text-2xl font-bold mb-3">
          {item.title}
        </h2>

        <p className="text-gray-600 mb-4">
          {item.description}
        </p>

        <div className="flex justify-between text-gray-700 mb-5">

          <div className="flex items-center gap-2">
            <FaClock className="text-blue-600" />
            <span>{item.duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaSignal className="text-green-600" />
            <span>{item.level}</span>
          </div>

        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Learn More
        </button>

      </div>

    </div>
  );
}

export default PopularClassCard;