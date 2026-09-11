

import { useNavigate } from "react-router-dom";
import popularClasses from "../data/popularClasses";

function PopularClasses() {
  const navigate = useNavigate();

  const handleLearnMore = (category) => {
    navigate(
      `/dashboard/classes?category=${encodeURIComponent(category)}`
    );
  };

  return (
    <section className="w-full bg-gray-50">
      <div className="w-full max-w-7xl flex flex-col gap-10">
        <div className="text-center flex flex-col gap-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Popular Classes
          </h1>

          <p className="text-gray-500 text-sm sm:text-base">
            Explore our most popular fitness classes and start your journey
            today.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularClasses.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-green-600 text-xs font-semibold min-h-8 rounded-full shadow-sm flex items-center indent-3 pr-3">
                  {item.level}
                </span>
              </div>

              <div className="flex flex-col gap-5 min-h-72">
                <div className="flex flex-col gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {item.title}
                  </h2>

                  <p className="text-gray-600 text-sm sm:text-base leading-6 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
                  <span className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                    <span>🕒</span>
                    {item.duration}
                  </span>

                  <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                    <span>📊</span>
                    {item.level}
                  </span>
                </div>

                <button
                  onClick={() => handleLearnMore(item.category)}
                  className="w-full min-h-11 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularClasses;