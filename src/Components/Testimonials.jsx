import { FaStar } from "react-icons/fa";

function Testimonials() {
  const reviews = [
    {
      name: "Emma Wilson",
      review: "Excellent trainers! I lost 8kg in 3 months. Highly recommended.",
      rating: 5,
    },
    {
      name: "Michael Brown",
      review: "Very flexible booking system and professional coaching.",
      rating: 5,
    },
    {
      name: "Sophia Davis",
      review: "Amazing experience. The trainers are friendly and motivating.",
      rating: 5,
    },
  ];

  return (
    <section className="bg-gray-100 m-0 p-0">
      <h4 className="text-center text-blue-600 font-semibold m-0 p-0">
        TESTIMONIALS
      </h4>

      <h1 className="text-5xl font-bold text-center m-0 p-0">
        What Our Members Say
      </h1>

      <div className="grid md:grid-cols-3 m-0 p-0">
        {reviews.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg m-0 p-0"
          >
            <div className="flex m-0 p-0">
              {[...Array(item.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 m-0 p-0" />
              ))}
            </div>

            <p className="text-gray-600 m-0 p-0">
              "{item.review}"
            </p>

            <h2 className="font-bold text-xl m-0 p-0">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
