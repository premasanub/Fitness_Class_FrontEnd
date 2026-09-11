

import { FaStar } from "react-icons/fa";

function Testimonials() {
  const reviews = [
    {
      name: "Emma Wilson",
      review:
        "Excellent trainers! I lost 8kg in 3 months. Highly recommended.",
      rating: 5,
    },
    {
      name: "Michael Brown",
      review:
        "Very flexible booking system and professional coaching.",
      rating: 5,
    },
    {
      name: "Sophia Davis",
      review:
        "Amazing experience. The trainers are friendly and motivating.",
      rating: 5,
    },
  ];

  return (
    <section className="w-full bg-gray-100">
      <div className="w-full max-w-7xl flex flex-col gap-10">
        <div className="text-center flex flex-col gap-3">
          <p className="text-blue-600 font-semibold text-lg">
            TESTIMONIALS
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            What Our Members Say
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md min-h-[230px] flex flex-col gap-5 justify-center hover:shadow-xl transition-all duration-300"
            >
              <div className="flex gap-1">
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="text-yellow-400 text-lg"
                  />
                ))}
              </div>

              <p className="text-gray-600 text-base leading-relaxed flex-grow">
                "{item.review}"
              </p>

              <h2 className="font-bold text-xl text-gray-900">
                {item.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;