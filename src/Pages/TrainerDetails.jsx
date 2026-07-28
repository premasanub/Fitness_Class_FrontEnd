import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import trainerData from "../data/trainerData";
import classData from "../data/classData";

function TrainerDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const trainer = trainerData.find(
    (item) => item.id === Number(id)
  );

  if (!trainer) {
    return (
      <h2 className="text-center text-3xl font-bold mt-10">
        Trainer Not Found
      </h2>
    );
  }

 const selectedClass = classData.find(
        (item) => item.id === Number(id)
    );

    if (!selectedClass) {
        return <h2>Class Not Found</h2>;
    }


  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={trainer.image}
          alt={trainer.name}
          className="rounded-xl shadow-lg w-full h-[550px] object-cover"
        />

        <div>

          <h1 className="text-4xl font-bold">
            {trainer.name}
          </h1>

          <div className="flex items-center gap-2 mt-3 text-yellow-500">
            <FaStar />
            <span>{trainer.rating}</span>
            <span className="text-gray-600">
              ({trainer.reviews} Reviews)
            </span>
          </div>

          <h2 className="text-xl font-semibold mt-8">
            Qualification
          </h2>

          <p className="text-gray-700">
            {trainer.qualification}
          </p>

          <h2 className="text-xl font-semibold mt-6">
            Experience
          </h2>

          <p>{trainer.experience}</p>

          <h2 className="text-xl font-semibold mt-6">
            Specialization
          </h2>

          <ul className="list-disc ml-6 mt-2">
            <li>{trainer.specialization}</li>
            <li>Weight Loss</li>
            <li>Healthy Lifestyle</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6">
            About Trainer
          </h2>

          <p className="text-gray-700 mt-2">
            {trainer.introMessage}
          </p>

          <h2 className="text-xl font-semibold mt-6">
            Weekly Availability
          </h2>

          <div className="mt-3 space-y-2">

            {trainer.availability.map((slot, index) => (

              <div
                key={index}
                className="bg-gray-100 p-3 rounded-lg"
              >
                {slot}
              </div>

            ))}

          </div>

          <button
            onClick={() => navigate(`/dashboard/booking/${selectedClass.id}`)}
            className="mt-10 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
          >
            Book a Session
          </button>

        </div>

      </div>

    </div>
  );
}

export default TrainerDetails;