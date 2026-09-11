
import { useNavigate } from "react-router-dom";

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

  const seatsAvailable = Number(item?.seats || 0);

  const handleViewDetails = () => {
    navigate(`/dashboard/classes/${item._id}`);
  };

  const handleBooking = () => {
    if (seatsAvailable <= 0) return;

    navigate(`/dashboard/booking/${item._id}`);
  };

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col h-full">
      
      {/* Class Image */}
      <img
        src={classImages[item?.image] || strength}
        alt={item?.title || "Fitness class"}
        className="w-full h-52 object-cover"
      />

      {/* Class Content */}
      <div className="flex flex-col gap-4 flex-1">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          {item?.title || "Fitness Class"}
        </h2>

        {/* Class Information */}
        <div className="flex flex-col gap-2 text-gray-600">

          <p>
            <span className="font-semibold text-gray-800">
              Trainer:
            </span>{" "}
            {item?.trainer?.name || "Not Assigned"}
          </p>

          <p>
            <span className="font-semibold text-gray-800">
              Category:
            </span>{" "}
            {item?.category || "Not Available"}
          </p>

          <p>
            <span className="font-semibold text-gray-800">
              Date:
            </span>{" "}
            {item?.date || "Not Available"}
          </p>

          <p>
            <span className="font-semibold text-gray-800">
              Time:
            </span>{" "}
            {item?.time || "Not Available"}
          </p>

        </div>

        {/* Price & Seats */}
        <div className="flex flex-col gap-2">

          <p className="text-blue-600 font-bold text-lg">
            ₹ {item?.price ?? 0}
          </p>

          <p
            className={`font-semibold ${
              seatsAvailable > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {seatsAvailable > 0
              ? `Seats Available: ${seatsAvailable}`
              : "Class Full"}
          </p>

        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">

          <button
            type="button"
            onClick={handleViewDetails}
            className="bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            View Details
          </button>

          {seatsAvailable > 0 ? (
            <button
              type="button"
              onClick={handleBooking}
              className="bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
            >
              Book Now
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
            >
              Class Full
            </button>
          )}

        </div>
      </div>
    </article>
  );
}

export default ClassCard;
