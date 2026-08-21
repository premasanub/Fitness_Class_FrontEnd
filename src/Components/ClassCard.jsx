import { useNavigate } from "react-router-dom";

// Import Images
import yoga from "../assets/yoga.jpg";
import zumba from "../assets/zumba.jpg";
import cardio from "../assets/cardio.jpg";
import strength from "../assets/strength.jpg";

function ClassCard({ item }) {
  const navigate = useNavigate();

  const classImages = {
    "yoga.jpg": yoga,
    "zumba.jpg": zumba,
    "cardio.jpg": cardio,
    "strength.jpg": strength,
  };

  const seatsAvailable = Number(item.seats || 0);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl duration-300">

      {/* Image */}
      <img
        src={classImages[item.image] || strength}
        alt={item.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">
          {item.title}
        </h2>

        {/* Trainer */}
        <p className="text-gray-600">
          <span className="font-semibold">Trainer:</span>{" "}
          {item.trainer?.name || "Not Assigned"}
        </p>

        {/* Category */}
        <p className="text-gray-600">
          <span className="font-semibold">Category:</span>{" "}
          {item.category}
        </p>

        {/* Date */}
        <p className="text-gray-600">
          <span className="font-semibold">Date:</span>{" "}
          {item.date}
        </p>

        {/* Time */}
        <p className="text-gray-600">
          <span className="font-semibold">Time:</span>{" "}
          {item.time}
        </p>

        {/* Price */}
        <p className="text-blue-600 font-bold mt-2">
          ₹ {item.price}
        </p>

        {/* Seats */}
        <p
          className={`font-semibold ${
            seatsAvailable > 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          Seats Available: {seatsAvailable}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-5">

          {/* View Details */}
          <button
            onClick={() =>
              navigate(`/dashboard/classes/${item._id}`)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            View Details
          </button>

          {/* Book Now / Full */}
          {seatsAvailable > 0 ? (
            <button
              onClick={() =>
                navigate(`/dashboard/booking/${item._id}`)
              }
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Book Now
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
            >
              Class Full
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default ClassCard;