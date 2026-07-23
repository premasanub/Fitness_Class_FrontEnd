import { FaClock, FaSignal } from "react-icons/fa";

function ClassCard({
  image,
  title,
  description,
  duration,
  level,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 duration-300">

      <img
        src={image}
        alt={title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="text-gray-600 mt-3">
          {description}
        </p>

        <div className="flex justify-between mt-5 text-blue-600">

          <div className="flex items-center gap-2">
            <FaClock />
            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaSignal />
            <span>{level}</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ClassCard;