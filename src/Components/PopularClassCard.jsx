import { FaClock, FaSignal } from "react-icons/fa";

function PopularClassCard({ item }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col gap-4 m-0 p-0">

      {/* Class Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-56 object-cover m-0 p-0"
      />

      {/* Card Content - uses flex-col and gap to isolate text layers smoothly */}
      <div className="flex flex-col gap-3 m-0 p-0 w-full">

        <h2 className="text-2xl font-bold m-0 p-0">
          {item.title}
        </h2>

        <p className="text-gray-600 m-0 p-0">
          {item.description}
        </p>

        {/* Info row with gap-4 to split icons away from labels without inner padding */}
        <div className="flex justify-between text-gray-700 gap-4 m-0 p-0 w-full">
          <div className="flex items-center gap-2 m-0 p-0">
            <FaClock className="text-blue-600 m-0 p-0" />
            <span className="m-0 p-0">{item.duration}</span>
          </div>

          <div className="flex items-center gap-2 m-0 p-0">
            <FaSignal className="text-green-600 m-0 p-0" />
            <span className="m-0 p-0">{item.level}</span>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition m-0 p-0">
          Learn More
        </button>

      </div>

    </div>
  );
}

export default PopularClassCard;

