

function TrainerCard({ trainer }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
      <img
        src={trainer.profileImage || "/default-trainer.jpg"}
        alt={trainer.name || "Trainer"}
        className="w-full h-64 object-cover"
      />

      <div className="flex flex-col gap-3 min-h-64">
        <h2 className="text-xl font-bold text-gray-900">
          {trainer.name || "Trainer"}
        </h2>

        <p className="text-blue-600 font-medium">
          {trainer.specialization || "Fitness Trainer"}
        </p>

        <p className="text-gray-700">
          <strong>Experience:</strong>{" "}
          {trainer.experience ?? 0} years
        </p>

        <p className="text-gray-700">
          <strong>Qualification:</strong>{" "}
          {trainer.qualification || "Not specified"}
        </p>

        <p className="text-gray-700">
          <strong>Rating:</strong>{" "}
          ⭐ {trainer.rating ?? 0}
        </p>

        {trainer.bio && (
          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {trainer.bio}
          </p>
        )}
      </div>
    </div>
  );
}

export default TrainerCard;