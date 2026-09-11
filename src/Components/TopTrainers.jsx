

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../Service/api";
import TrainerCard from "./TrainerCard";

function TopTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/trainers/");

      const trainerList = response.data?.trainers;

      if (Array.isArray(trainerList)) {
        setTrainers(trainerList);
      } else {
        setTrainers([]);
        toast.error("No trainers available");
      }
    } catch {
      setTrainers([]);
      toast.error("Failed to load trainers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full">
      <div className="w-full max-w-7xl flex flex-col gap-10">
        <div className="text-center flex flex-col gap-3">
          <p className="text-blue-600 font-semibold text-lg">
            OUR PROFESSIONALS
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Meet Our Experts
          </h1>

          <p className="text-gray-500">
            Train with experienced professionals who are committed to your
            fitness journey.
          </p>
        </div>

        {loading ? (
          <div className="min-h-40 flex items-center justify-center">
            <p className="text-gray-500 font-medium">
              Loading trainers...
            </p>
          </div>
        ) : trainers.length === 0 ? (
          <div className="min-h-40 flex items-center justify-center">
            <p className="text-gray-500">
              No trainers available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {trainers.slice(0, 4).map((trainer) => (
              <TrainerCard
                key={trainer._id}
                trainer={trainer}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default TopTrainers;