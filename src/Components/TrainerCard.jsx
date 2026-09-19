function TrainerCard({ trainer }) {
  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <img
        src={trainer.profileImage || "/default-trainer.jpg"}
        alt={trainer.name || "Trainer"}
        className="w-full h-64 object-cover"
      />

      <div className="flex flex-col gap-4 flex-1 p-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-gray-900">
            {trainer.name || "Trainer"}
          </h2>

          <p className="text-blue-600 font-semibold">
            {trainer.specialization || "Fitness Trainer"}
          </p>
        </div>

        <div className="flex flex-col gap-3 text-gray-700 text-sm">
          <p>
            <span className="font-semibold text-gray-900">
              Experience:
            </span>{" "}
            {trainer.experience ?? 0} years
          </p>

          <p>
            <span className="font-semibold text-gray-900">
              Qualification:
            </span>{" "}
            {trainer.qualification || "Not specified"}
          </p>

          <p>
            <span className="font-semibold text-gray-900">
              Rating:
            </span>{" "}
            ⭐ {trainer.rating ?? 0}
          </p>
        </div>

        {trainer.bio && (
          <p className="text-gray-600 leading-relaxed line-clamp-3 mt-auto pt-2">
            {trainer.bio}
          </p>
        )}
      </div>
    </article>
  );
}

export default TrainerCard;