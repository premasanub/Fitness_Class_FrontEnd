import { FaStar } from "react-icons/fa";

function TrainerReviews() {

  const reviews = [
    {
      id: 1,
      student: "John",
      rating: 5,
      comment: "Excellent trainer. Very motivating.",
    },
    {
      id: 2,
      student: "Emma",
      rating: 4,
      comment: "Great yoga sessions.",
    },
    {
      id: 3,
      student: "David",
      rating: 5,
      comment: "Best fitness coach.",
    },
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Student Reviews
      </h1>

      <div className="space-y-6">

        {reviews.map((review) => (

          <div
            key={review.id}
            className="bg-white shadow-lg rounded-xl p-6"
          >

            <h2 className="text-xl font-bold">
              {review.student}
            </h2>

            <div className="flex mt-2 text-yellow-500">

              {[...Array(review.rating)].map((_, index) => (

                <FaStar key={index} />

              ))}

            </div>

            <p className="mt-3 text-gray-700">
              {review.comment}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TrainerReviews;