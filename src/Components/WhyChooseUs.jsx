import {
  FaUserTie,
  FaDumbbell,
  FaClock,
  FaHeartbeat,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaUserTie size={40} className="text-blue-600 m-0 p-0" />,
      title: "Expert Trainers",
      description: "Train with certified and experienced fitness professionals.",
    },
    {
      icon: <FaDumbbell size={40} className="text-blue-600 m-0 p-0" />,
      title: "Modern Equipment",
      description: "Access world-class equipment for effective workouts.",
    },
    {
      icon: <FaClock size={40} className="text-blue-600 m-0 p-0" />,
      title: "Flexible Schedule",
      description: "Choose classes based on your convenient time.",
    },
    {
      icon: <FaHeartbeat size={40} className="text-blue-600 m-0 p-0" />,
      title: "Healthy Lifestyle",
      description: "Improve your fitness with personalized training plans.",
    },
  ];

  return (
    <section className="bg-gray-100 m-0 p-0">
      <h4 className="text-center text-blue-600 font-semibold m-0 p-0">
        WHY CHOOSE US
      </h4>

      <h1 className="text-5xl font-bold text-center m-0 p-0">
        Your Fitness, Our Priority
      </h1>

      <div className="grid md:grid-cols-4 m-0 p-0">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg text-center hover:shadow-2xl transition m-0 p-0"
          >
            <div className="flex justify-center m-0 p-0">
              {feature.icon}
            </div>

            <h2 className="text-2xl font-bold m-0 p-0">
              {feature.title}
            </h2>

            <p className="text-gray-600 m-0 p-0">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
