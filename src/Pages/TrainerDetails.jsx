import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Service/api";

function TrainerDetails() {
  const { id } = useParams();

  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await api.get(`/trainers/${id}`);

        setTrainer(
          response.data.trainer || response.data
        );
      } catch (error) {
        // Keep console clean for production
      } finally {
        setLoading(false);
      }
    };

    fetchTrainer();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm px-8 py-6">
          <p className="text-gray-600">Loading trainer...</p>
        </div>
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Trainer Not Found
          </h2>

          <p className="text-gray-600">
            The requested trainer could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={trainer.profileImage}
              alt={trainer.name}
              className="w-full h-[420px] sm:h-[500px] lg:h-[550px] object-cover"
            />
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {trainer.name}
            </h1>

            <p className="text-blue-600 font-semibold text-lg mb-6">
              {trainer.specialization}
            </p>

            {trainer.bio && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  About Trainer
                </h2>

                <p className="text-gray-600 leading-7">
                  {trainer.bio}
                </p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-sm text-gray-500 mb-1">
                  Qualification
                </p>

                <p className="font-semibold text-gray-900">
                  {trainer.qualification || "Not specified"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-sm text-gray-500 mb-1">
                  Experience
                </p>

                <p className="font-semibold text-gray-900">
                  {trainer.experience || "Not specified"}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Availability
              </h2>

              <div className="flex flex-col gap-3">
                {trainer.availableDays?.map((day) => (
                  <div
                    key={day}
                    className="bg-gray-50 rounded-lg px-4 py-3 text-gray-700"
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 mt-8 transition"
            >
              Book a Class
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerDetails;
