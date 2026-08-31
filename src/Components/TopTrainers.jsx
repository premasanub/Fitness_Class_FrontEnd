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
      toast.error("Failed to load trainers");
    }
  };

  return (
    <section className="m-0 p-0">
      <h1 className="text-5xl font-bold text-center m-0 p-0">
        Meet Our Experts
      </h1>

      <div className="grid md:grid-cols-4 m-0 p-0">
        {trainers.slice(0, 4).map((trainer) => (
          <TrainerCard key={trainer._id} trainer={trainer} />
        ))}
      </div>
    </section>
  );
}

export default TopTrainers;
