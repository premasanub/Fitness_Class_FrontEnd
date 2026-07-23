import TrainerCard from "./TrainerCard";

import trainer1 from "../assets/trainer1.jpg";
import trainer2 from "../assets/trainer2.jpg";
import trainer3 from "../assets/trainer3.jpg";
import trainer4 from "../assets/trainer4.jpg";

function TopTrainers() {

  const trainers = [
    {
      image: trainer1,
      name: "John Smith",
      specialization: "Strength Coach",
      experience: "6 Years Experience",
      rating: 4.9,
    },
    {
      image: trainer2,
      name: "Sarah Johnson",
      specialization: "Yoga Trainer",
      experience: "5 Years Experience",
      rating: 4.8,
    },
    {
      image: trainer3,
      name: "David Wilson",
      specialization: "Cardio Expert",
      experience: "8 Years Experience",
      rating: 4.9,
    },
    {
      image: trainer4,
      name: "Emily Brown",
      specialization: "Zumba Instructor",
      experience: "4 Years Experience",
      rating: 4.7,
    },
  ];

  return (
    <section className="py-20">

      <h4 className="text-center text-blue-600 font-semibold">
        PROFESSIONAL TRAINERS
      </h4>

      <h1 className="text-5xl font-bold text-center mt-3">
        Meet Our Experts
      </h1>

      <div className="grid md:grid-cols-4 gap-8 px-10 mt-12">

        {trainers.map((trainer, index) => (
          <TrainerCard
            key={index}
            image={trainer.image}
            name={trainer.name}
            specialization={trainer.specialization}
            experience={trainer.experience}
            rating={trainer.rating}
          />
        ))}

      </div>

      <div className="text-center mt-10">

        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
          View All Trainers
        </button>

      </div>

    </section>
  );
}

export default TopTrainers;