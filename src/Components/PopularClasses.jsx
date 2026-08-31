import { useNavigate } from "react-router-dom";
import popularClasses from "../data/popularClasses";

function PopularClasses() {
  const navigate = useNavigate();

  const handleLearnMore = (category) => {
    navigate(`/dashboard/classes?category=${encodeURIComponent(category)}`);
  };

  return (
    // Section layer configured as a grid stack to isolate title from items cleanly
    <section className="grid gap-6 m-0 p-0 w-full">
      <h1 className="text-5xl font-bold text-center m-0 p-0">
        Popular Classes
      </h1>

      {/* Grid container utilizes gap-6 properties to organize the separate layout grid blocks safely */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-6 m-0 p-0 w-full">
        {popularClasses.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition flex flex-col gap-4 m-0 p-0"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-60 object-cover m-0 p-0"
            />

            {/* CONTENT - flex-col with gap prevents text lines from smashing together */}
            <div className="flex flex-col gap-3 m-0 p-0 w-full">
              <h2 className="text-2xl font-bold m-0 p-0">
                {item.title}
              </h2>

              <p className="text-gray-600 m-0 p-0">
                {item.description}
              </p>

              {/* Flex row container leverages gap-4 to properly isolate indicators across borders */}
              <div className="flex justify-between gap-4 m-0 p-0 w-full">
                <span className="text-blue-600 m-0 p-0">
                  🕒 {item.duration}
                </span>
                <span className="text-green-600 m-0 p-0">
                  📊 {item.level}
                </span>
              </div>

              {/* LEARN MORE */}
              <button
                onClick={() => handleLearnMore(item.category)}
                className="w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 m-0 p-0"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularClasses;
