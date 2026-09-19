import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";

function Hero() {
  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="w-full min-h-screen bg-black/60 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 flex items-center">
          <div className="max-w-4xl text-white flex flex-col gap-6">
            <div>
              <span className="inline-flex items-center min-h-10 px-4 py-2 bg-blue-600 rounded-lg text-sm font-semibold">
                #1 Fitness Booking Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Transform Your
              <br />
              <span className="text-blue-500">Fitness</span> Journey
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
              Book professional trainers and
              <br />
              personalized fitness classes.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                to="/classes"
                className="min-h-11 min-w-40 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                Explore Classes
              </Link>

              <Link
                to="/register"
                className="min-h-11 min-w-32 px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition flex items-center justify-center"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;