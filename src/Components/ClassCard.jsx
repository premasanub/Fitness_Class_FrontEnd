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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl duration-300 m-0 p-0">

      {/* Image */}
      <img
        src={classImages[item.image] || strength}
        alt={item.title}
        className="w-full h-52 object-cover m-0 p-0"
      />

      <div className="m-0 p-0">

        {/* Title */}
        <h2 className="text-2xl font-bold m-0 p-0">
          {item.title}
        </h2>

        {/* Trainer */}
        <p className="text-gray-600 m-0 p-0">
          <span className="font-semibold">Trainer:</span>{" "}
          {item.trainer?.name || "Not Assigned"}
        </p>

        {/* Category */}
        <p className="text-gray-600 m-0 p-0">
          <span className="font-semibold">Category:</span>{" "}
          {item.category}
        </p>

        {/* Date */}
        <p className="text-gray-600 m-0 p-0">
          <span className="font-semibold">Date:</span>{" "}
          {item.date}
        </p>

        {/* Time */}
        <p className="text-gray-600 m-0 p-0">
          <span className="font-semibold">Time:</span>{" "}
          {item.time}
        </p>

        {/* Price */}
        <p className="text-blue-600 font-bold m-0 p-0">
          ₹ {item.price}
        </p>

        {/* Seats */}
        <p
          className={`font-semibold m-0 p-0 ${
            seatsAvailable > 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          Seats Available: {seatsAvailable}
        </p>

        {/* Buttons */}
        <div className="flex m-0 p-0">

          {/* View Details */}
          <button
            onClick={() => navigate(`/dashboard/classes/${item._id}`)}
            className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 m-0 p-0"
          >
            View Details
          </button>

          {/* Book Now / Full */}
          {seatsAvailable > 0 ? (
            <button
              onClick={() => navigate(`/dashboard/booking/${item._id}`)}
              className="bg-green-600 text-white rounded-lg hover:bg-green-700 m-0 p-0"
            >
              Book Now
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-400 text-white rounded-lg cursor-not-allowed m-0 p-0"
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
