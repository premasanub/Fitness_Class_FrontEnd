import trainerData from "../data/trainerData";
import TrainerCard from "./TrainerCard";

function TopTrainers() {
  return (
    <section className="py-20">
      <h1 className="text-5xl font-bold text-center">
        Meet Our Experts
      </h1>

      <div className="grid md:grid-cols-4 gap-8 px-10 mt-12">
        {trainerData.slice(0, 4).map((trainer) => (
          <TrainerCard
            key={trainer.id}
            trainer={trainer}
          />
        ))}
      </div>
    </section>
  );
}

export default TopTrainers;