import { useEffect, useState } from "react";
import api from "../Service/api";
import TrainerCard from "./TrainerCard";
import { toast } from "react-toastify";

function TopTrainers() {

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {

      const response = await api.get("/trainers");

      setTrainers(response.data.trainers);

    } catch (error) {

      console.log("Failed to load trainers:", error);

      toast.error("Failed to load trainers");

    }
  };

  return (
    <section className="py-20">

      <h1 className="text-5xl font-bold text-center">
        Meet Our Experts
      </h1>

      <div className="grid md:grid-cols-4 gap-8 px-10 mt-12">

        {trainers.slice(0, 4).map((trainer) => (

          <TrainerCard
            key={trainer._id}
            trainer={trainer}
          />

        ))}

      </div>

    </section>
  );
}

export default TopTrainers;