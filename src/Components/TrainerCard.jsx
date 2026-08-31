function TrainerCard({ trainer }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden m-0 p-0">
      <img
        src={trainer.profileImage || "/default-trainer.jpg"}
        alt={trainer.name}
        className="w-full h-64 object-cover m-0 p-0"
      />

      <div className="m-0 p-0">
        <h2 className="text-xl font-bold m-0 p-0">
          {trainer.name}
        </h2>

        <p className="text-gray-600 m-0 p-0">
          {trainer.specialization}
        </p>

        <p className="m-0 p-0">
          Experience: {trainer.experience} years
        </p>

        <p className="m-0 p-0">
          Qualification: {trainer.qualification}
        </p>

        <p className="m-0 p-0">
          ⭐ {trainer.rating || 0}
        </p>

        <p className="text-gray-600 m-0 p-0">
          {trainer.bio}
        </p>
      </div>
    </div>
  );
}

export default TrainerCard;
