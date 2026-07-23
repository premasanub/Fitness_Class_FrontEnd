import ClassCard from "./ClassCard";

import yoga from "../assets/yoga.jpg";
import zumba from "../assets/zumba.jpg";
import cardio from "../assets/cardio.jpg";
import strength from "../assets/strength.jpg";

function PopularClasses() {

  const classes = [
    {
      image: yoga,
      title: "Yoga",
      description: "Improve flexibility and find inner peace.",
      duration: "60 min",
      level: "All Levels",
    },
    {
      image: zumba,
      title: "Zumba",
      description: "Fun dance workout to boost energy.",
      duration: "45 min",
      level: "All Levels",
    },
    {
      image: cardio,
      title: "Cardio",
      description: "Burn calories and improve endurance.",
      duration: "45 min",
      level: "All Levels",
    },
    {
      image: strength,
      title: "Strength Training",
      description: "Build muscle and get stronger.",
      duration: "60 min",
      level: "All Levels",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">

      <h4 className="text-blue-600 text-center font-semibold">
        CHOOSE YOUR WORKOUT
      </h4>

      <h1 className="text-5xl font-bold text-center mt-2">
        Popular Classes
      </h1>

      <div className="grid md:grid-cols-4 gap-8 px-10 mt-12">

        {classes.map((item, index) => (
          <ClassCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            duration={item.duration}
            level={item.level}
          />
        ))}

      </div>

      <div className="text-center mt-10">

        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
          View All Classes
        </button>

      </div>

    </section>
  );
}

export default PopularClasses;