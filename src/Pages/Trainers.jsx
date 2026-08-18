import { useEffect, useState } from "react";
import api from "../Service/api";
import { toast } from "react-toastify";
import TrainerCard from "../Components/TrainerCard";

function Trainers() {

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {

    try {

      const response = await api.get("/trainers");

      console.log("TRAINERS RESPONSE:", response.data);

      setTrainers(response.data.trainers);

    } catch (error) {

      console.log("TRAINERS ERROR:", error);
      
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      toast.error(
        error.response?.data?.message ||
        "Failed to load trainers"
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">

      <h1 className="text-4xl font-bold text-center mb-10">
        Our Expert Trainers
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Meet our certified fitness trainers who will guide you
        through your online fitness journey.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {trainers.map((trainer) => (
          <TrainerCard
            key={trainer._id}
            trainer={trainer}
          />
        ))}

      </div>

    </div>
  );
}

export default Trainers;