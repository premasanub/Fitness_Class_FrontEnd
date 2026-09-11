
import { useEffect, useState } from "react";
import api from "../Service/api";
import { toast } from "react-toastify";
import TrainerCard from "../Components/TrainerCard";

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/trainers");

      const trainerList = Array.isArray(response.data?.trainers)
        ? response.data.trainers
        : [];

      setTrainers(trainerList);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load trainers"
      );

      setTrainers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-[92%] max-w-7xl self-center flex flex-col gap-8">

        <div className="flex flex-col items-center justify-center gap-3 text-center min-h-40">
          <h1 className="text-4xl font-bold text-gray-900">
            Our Expert Trainers
          </h1>

          <div className="w-20 h-1 bg-blue-600 rounded-full" />

          <p className="max-w-2xl text-gray-600 leading-7">
            Meet our certified fitness trainers who will guide you
            through your online fitness journey.
          </p>
        </div>

        {loading ? (
          <div className="min-h-60 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
              <p className="text-gray-600">
                Loading trainers...
              </p>
            </div>
          </div>
        ) : trainers.length === 0 ? (
          <div className="min-h-60 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center">
            <p className="text-gray-600 text-lg">
              No trainers available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainers.map((trainer) => (
              <TrainerCard
                key={trainer._id}
                trainer={trainer}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Trainers;
