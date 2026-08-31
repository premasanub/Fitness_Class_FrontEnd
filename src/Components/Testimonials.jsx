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
    <section className="py-20 bg-gray-100">

      <h4 className="text-center text-blue-600 font-semibold">
        TESTIMONIALS
      </h4>

      <h1 className="text-5xl font-bold text-center mt-3">
        What Our Members Say
      </h1>

      <div className="grid md:grid-cols-3 gap-8 px-10 mt-12">

        {reviews.map((item, index) => (

          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-lg"
          >

            <div className="flex mb-4">
              {[...Array(item.rating)].map((_, i) => (
                <FaStar
                  key={i}
                  className="text-yellow-400"
                />
              ))}
            </div>

            <p className="text-gray-600">
              "{item.review}"
            </p>

            <h2 className="font-bold text-xl mt-5">
              {item.name}
            </h2>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Testimonials;