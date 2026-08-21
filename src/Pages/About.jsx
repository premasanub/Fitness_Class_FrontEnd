import { FaDumbbell, FaUsers, FaCalendarCheck, FaVideo } from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-black text-white py-20 px-6 text-center">

        <h1 className="text-5xl font-bold">
          About <span className="text-blue-500">FitBook</span>
        </h1>

        <p className="max-w-3xl mx-auto mt-6 text-gray-300 text-lg">
          FitBook is an online fitness class platform that helps users
          discover, book and attend fitness classes with professional
          trainers from anywhere.
        </p>

      </section>

      {/* About Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>

            <div className="flex items-center gap-3 mb-5">
              <FaDumbbell className="text-blue-600 text-4xl" />

              <h2 className="text-3xl font-bold">
                Your Fitness Journey Starts Here
              </h2>
            </div>

            <p className="text-gray-600 leading-7">
              FitBook makes fitness simple and accessible. Users can
              explore different fitness classes, check available seats,
              choose a suitable time slot and book their classes online.
            </p>

            <p className="text-gray-600 leading-7 mt-4">
              Our platform connects users with professional trainers
              offering classes such as Yoga, Zumba, Cardio and Strength
              Training.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h3 className="text-2xl font-bold mb-5">
              Why Choose FitBook?
            </h3>

            <ul className="space-y-4 text-gray-600">

              <li>
                ✓ Easy online class booking
              </li>

              <li>
                ✓ Professional trainers
              </li>

              <li>
                ✓ Multiple fitness categories
              </li>

              <li>
                ✓ Flexible time slots
              </li>

              <li>
                ✓ Online fitness sessions
              </li>

              <li>
                ✓ Booking and payment management
              </li>

            </ul>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="bg-white py-16">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-10">
            What We Offer
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="text-center p-6 rounded-xl shadow">
              <FaUsers className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="font-bold text-xl">
                Expert Trainers
              </h3>
              <p className="text-gray-500 mt-2">
                Learn from experienced fitness trainers.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl shadow">
              <FaCalendarCheck className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="font-bold text-xl">
                Easy Booking
              </h3>
              <p className="text-gray-500 mt-2">
                Book your preferred fitness class easily.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl shadow">
              <FaVideo className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="font-bold text-xl">
                Online Classes
              </h3>
              <p className="text-gray-500 mt-2">
                Join your classes online from anywhere.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl shadow">
              <FaDumbbell className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="font-bold text-xl">
                Stay Fit
              </h3>
              <p className="text-gray-500 mt-2">
                Build a healthier and stronger lifestyle.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default About;