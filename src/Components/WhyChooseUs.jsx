import {
  FaUserTie,
  FaDumbbell,
  FaClock,
  FaHeartbeat,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaUserTie size={40} className="text-blue-600" />,
      title: "Expert Trainers",
      description:
        "Train with certified and experienced fitness professionals.",
    },
    {
      icon: <FaDumbbell size={40} className="text-blue-600" />,
      title: "Modern Equipment",
      description:
        "Access world-class equipment for effective workouts.",
    },
    {
      icon: <FaClock size={40} className="text-blue-600" />,
      title: "Flexible Schedule",
      description:
        "Choose classes based on your convenient time.",
    },
    {
      icon: <FaHeartbeat size={40} className="text-blue-600" />,
      title: "Healthy Lifestyle",
      description:
        "Improve your fitness with personalized training plans.",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">

      <h4 className="text-center text-blue-600 font-semibold">
        WHY CHOOSE US
      </h4>

      <h1 className="text-5xl font-bold text-center mt-3">
        Your Fitness, Our Priority
      </h1>

      <div className="grid md:grid-cols-4 gap-8 px-10 mt-12">

        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition"
          >
            <div className="flex justify-center">
              {feature.icon}
            </div>

            <h2 className="text-2xl font-bold mt-5">
              {feature.title}
            </h2>

            <p className="text-gray-600 mt-3">
              {feature.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}

export default WhyChooseUs;