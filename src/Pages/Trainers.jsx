import trainerData from "../data/trainerData";
import TrainerCard from "../Components/TrainerCard";

function Trainers() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">

      <h1 className="text-4xl font-bold text-center mb-10">
        Our Expert Trainers
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Meet our certified fitness trainers who will guide you through
        your online fitness journey.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {trainerData.map((trainer) => {
  console.log(trainer);

  return (
    <TrainerCard 
      key={trainer.id}
      trainer={trainer}
    />
  );
})}

      </div>

    </div>
  );
}

export default Trainers;