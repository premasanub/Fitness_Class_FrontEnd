
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
      <div className="min-h-[70vh] flex items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Trainer Not Found
        </h2>
      </div>
    );
  }

  const selectedClass =
    classData.find((item) => item.trainerId === trainer.id) ||
    classData.find((item) => item.id === Number(id)) ||
    classData[0];

  const handleBooking = () => {
    if (!selectedClass) return;

    navigate(`/dashboard/booking/${selectedClass.id}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col gap-10">
      <div className="w-[92%] max-w-6xl self-center flex flex-col gap-10">

        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Trainer Details
          </h1>

          <div className="w-20 h-1 bg-blue-600 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="w-full h-[550px]">
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-full h-full rounded-xl shadow-lg object-cover"
            />
          </div>

          <div className="w-full flex flex-col gap-5">

            <div className="flex flex-col gap-3">
              <h2 className="text-4xl font-bold text-gray-900">
                {trainer.name}
              </h2>

              <div className="flex items-center gap-2 text-yellow-500">
                <FaStar />

                <span className="font-semibold">
                  {trainer.rating}
                </span>

                <span className="text-gray-600">
                  ({trainer.reviews} Reviews)
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Qualification
              </h3>

              <p className="text-gray-700">
                {trainer.qualification}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Experience
              </h3>

              <p className="text-gray-700">
                {trainer.experience}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Specialization
              </h3>

              <ul className="list-disc list-inside text-gray-700 flex flex-col gap-2">
                <li>{trainer.specialization}</li>
                <li>Weight Loss</li>
                <li>Healthy Lifestyle</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-900">
                About Trainer
              </h3>

              <p className="text-gray-700 leading-7">
                {trainer.introMessage}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-semibold text-gray-900">
                Weekly Availability
              </h3>

              <div className="flex flex-col gap-2">
                {trainer.availability?.map((slot, index) => (
                  <div
                    key={index}
                    className="min-h-12 bg-gray-100 border border-gray-200 rounded-lg flex items-center"
                  >
                    <span className="indent-3 text-gray-700">
                      {slot}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleBooking}
              disabled={!selectedClass}
              className="w-full min-h-12 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition flex items-center justify-center"
            >
              Book a Session
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerDetails;
