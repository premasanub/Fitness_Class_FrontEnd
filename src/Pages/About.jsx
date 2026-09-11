
import {
  FaDumbbell,
  FaUsers,
  FaCalendarCheck,
  FaVideo,
} from "react-icons/fa";

function About() {
  const features = [
    {
      icon: <FaUsers />,
      title: "Expert Trainers",
      description: "Learn from experienced fitness trainers.",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Easy Booking",
      description: "Book your preferred fitness class easily.",
    },
    {
      icon: <FaVideo />,
      title: "Online Classes",
      description: "Join your classes online from anywhere.",
    },
    {
      icon: <FaDumbbell />,
      title: "Stay Fit",
      description: "Build a healthier and stronger lifestyle.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col gap-16">

      {/* Hero */}
      <section className="bg-black text-white text-center min-h-80 flex flex-col items-center justify-center gap-5">
        <h1 className="text-4xl md:text-5xl font-bold">
          About <span className="text-blue-500">FitBook</span>
        </h1>

        <p className="w-[90%] max-w-3xl text-gray-300 text-lg leading-7">
          FitBook is an online fitness class platform that helps users
          discover, book and attend fitness classes with professional
          trainers from anywhere.
        </p>
      </section>

      {/* About Content */}
      <section className="w-full max-w-6xl self-center">
        <div className="w-[92%] self-center grid md:grid-cols-2 gap-12 items-center">

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <FaDumbbell className="text-blue-600 text-4xl shrink-0" />

              <h2 className="text-3xl font-bold">
                Your Fitness Journey Starts Here
              </h2>
            </div>

            <p className="text-gray-600 leading-7">
              FitBook makes fitness simple and accessible. Users can
              explore different fitness classes, check available seats,
              choose a suitable time slot and book their classes online.
            </p>

            <p className="text-gray-600 leading-7">
              Our platform connects users with professional trainers
              offering classes such as Yoga, Zumba, Cardio and Strength
              Training.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg min-h-80 flex flex-col justify-center gap-5">
            <div className="w-[90%] self-center flex flex-col gap-5">
              <h3 className="text-2xl font-bold">
                Why Choose FitBook?
              </h3>

              <ul className="flex flex-col gap-4 text-gray-600">
                <li>✓ Easy online class booking</li>
                <li>✓ Professional trainers</li>
                <li>✓ Multiple fitness categories</li>
                <li>✓ Flexible time slots</li>
                <li>✓ Online fitness sessions</li>
                <li>✓ Booking and payment management</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="bg-white min-h-96 flex flex-col justify-center gap-10">
        <div className="w-full max-w-6xl self-center flex flex-col gap-10">

          <h2 className="text-3xl font-bold text-center">
            What We Offer
          </h2>

          <div className="w-[92%] self-center grid sm:grid-cols-2 md:grid-cols-4 gap-6">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl shadow-lg border border-gray-100 min-h-52 flex flex-col items-center justify-center gap-4 text-center"
              >
                <div className="text-blue-600 text-4xl">
                  {feature.icon}
                </div>

                <h3 className="font-bold text-xl">
                  {feature.title}
                </h3>

                <p className="text-gray-500 w-[90%]">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

    </div>
  );
}

export default About;

