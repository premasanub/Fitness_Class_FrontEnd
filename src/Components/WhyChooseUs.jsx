import {
  FaUserTie,
  FaDumbbell,
  FaClock,
  FaHeartbeat,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaUserTie />,
      title: "Expert Trainers",
      description:
        "Train with certified and experienced fitness professionals.",
    },
    {
      icon: <FaDumbbell />,
      title: "Modern Equipment",
      description:
        "Access world-class equipment for effective workouts.",
    },
    {
      icon: <FaClock />,
      title: "Flexible Schedule",
      description:
        "Choose classes based on your convenient time.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Healthy Lifestyle",
      description:
        "Improve your fitness with personalized training plans.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold text-lg">
            WHY CHOOSE US
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
            Your Fitness, Our Priority
          </h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-7 text-center
                         min-h-[240px] flex flex-col items-center
                         justify-center
                         hover:shadow-xl hover:-translate-y-1
                         transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-blue-600 text-4xl mb-5">
                {feature.icon}
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                {feature.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 mt-3 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;