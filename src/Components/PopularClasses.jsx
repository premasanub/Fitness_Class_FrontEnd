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
    <section className="py-20 px-6">

      <h1 className="text-5xl font-bold text-center mb-12">
        Popular Classes
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {popularClasses.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >

            {/* IMAGE */}

            <img
              src={item.image}
              alt={item.title}
              className="w-full h-60 object-cover"
            />

            {/* CONTENT */}

            <div className="p-6">

              <h2 className="text-2xl font-bold mb-3">
                {item.title}
              </h2>

              <p className="text-gray-600 mb-5">
                {item.description}
              </p>

              <div className="flex justify-between mb-5">

                <span className="text-blue-600">
                  🕒 {item.duration}
                </span>

                <span className="text-green-600">
                  📊 {item.level}
                </span>

              </div>

              {/* LEARN MORE */}

              <button
                onClick={() =>
                  handleLearnMore(item.category)
                }
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
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