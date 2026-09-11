// import { useEffect, useState } from "react";
// import { FaStar, FaUser } from "react-icons/fa";

// import api from "../../Service/api";

// function TrainerReviews() {
//   const [reviews, setReviews] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Get logged-in trainer
//   const storedUser =
//     JSON.parse(localStorage.getItem("user")) ||
//     JSON.parse(localStorage.getItem("trainer")) ||
//     JSON.parse(localStorage.getItem("userData"));

//   const trainerId =
//     storedUser?._id ||
//     storedUser?.id ||
//     localStorage.getItem("userId");


//   // ==========================================
//   // FETCH REVIEWS
//   // ==========================================

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         if (!trainerId) {
//           setError(
//             "Trainer information not found. Please login again."
//           );
//           return;
//         }

//         const response = await api.get(
//           `/trainers/reviews/${trainerId}`
//         );

//         if (response.data.success) {
//           setReviews(
//             response.data.reviews || []
//           );

//           setAverageRating(
//             response.data.averageRating || 0
//           );

//         } else {
//           setError(
//             response.data.message ||
//               "Failed to load reviews"
//           );
//         }

//       } catch (err) {
//         console.log(
//           "Trainer Reviews Error:",
//           err
//         );

//         setError(
//           err.response?.data?.message ||
//             "Failed to load reviews"
//         );

//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();

//   }, [trainerId]);


//   // ==========================================
//   // LOADING
//   // ==========================================

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-20">

//         <p className="text-lg text-gray-600">
//           Loading reviews...
//         </p>

//       </div>
//     );
//   }


//   // ==========================================
//   // ERROR
//   // ==========================================

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-6">

//         <h2 className="font-bold text-lg">
//           Unable to load reviews
//         </h2>

//         <p className="mt-2">
//           {error}
//         </p>

//       </div>
//     );
//   }


//   return (
//     <div>

//       {/* PAGE HEADER */}

//       <div className="mb-8">

//         <h1 className="text-3xl font-bold text-gray-800">
//           Student Reviews
//         </h1>

//         <p className="text-gray-500 mt-2">
//           See what your students think about your classes.
//         </p>

//       </div>


//       {/* AVERAGE RATING */}

//       <div className="bg-white shadow rounded-xl p-6 mb-8">

//         <div className="flex items-center gap-5">

//           <div>

//             <p className="text-sm text-gray-500">
//               Average Trainer Rating
//             </p>

//             <p className="text-4xl font-bold text-gray-800 mt-1">
//               {averageRating}
//             </p>

//           </div>


//           <div>

//             <div className="flex text-yellow-500 text-xl">

//               {[1, 2, 3, 4, 5].map((star) => (

//                 <FaStar
//                   key={star}
//                   className={
//                     star <= Math.round(averageRating)
//                       ? "text-yellow-500"
//                       : "text-gray-300"
//                   }
//                 />

//               ))}

//             </div>

//             <p className="text-sm text-gray-500 mt-1">
//               {reviews.length} review
//               {reviews.length !== 1 ? "s" : ""}
//             </p>

//           </div>

//         </div>

//       </div>


//       {/* EMPTY STATE */}

//       {reviews.length === 0 ? (

//         <div className="bg-white shadow rounded-xl p-10 text-center">

//           <FaStar className="text-5xl text-gray-300 mx-auto mb-4" />

//           <h2 className="text-xl font-semibold text-gray-700">
//             No Reviews Yet
//           </h2>

//           <p className="text-gray-500 mt-2">
//             Student reviews will appear here after they submit feedback.
//           </p>

//         </div>

//       ) : (

//         /* REVIEWS */

//         <div className="space-y-6">

//           {reviews.map((review) => {

//             const studentName =
//               review.user?.name ||
//               review.student?.name ||
//               "Student";

//             const rating =
//               Number(review.trainerRating) || 0;

//             const comment =
//               review.trainerFeedback ||
//               review.comment ||
//               review.feedback ||
//               review.message ||
//               "No feedback provided.";

//             return (

//               <div
//                 key={review._id}
//                 className="bg-white shadow-lg rounded-xl p-6"
//               >

//                 {/* STUDENT */}

//                 <div className="flex items-center gap-4">

//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">

//                     {review.user?.profileImage ? (

//                       <img
//                         src={review.user.profileImage}
//                         alt={studentName}
//                         className="w-12 h-12 rounded-full object-cover"
//                       />

//                     ) : (

//                       <FaUser className="text-blue-600" />

//                     )}

//                   </div>


//                   <div>

//                     <h2 className="text-xl font-bold text-gray-800">
//                       {studentName}
//                     </h2>

//                     {review.class && (
//                       <p className="text-sm text-gray-500">
//                         {review.class.name ||
//                           review.class.title ||
//                           review.class.className ||
//                           "Fitness Class"}
//                       </p>
//                     )}

//                   </div>

//                 </div>


//                 {/* RATING */}

//                 <div className="flex mt-4 text-xl">

//                   {[1, 2, 3, 4, 5].map((star) => (

//                     <FaStar
//                       key={star}
//                       className={
//                         star <= rating
//                           ? "text-yellow-500"
//                           : "text-gray-300"
//                       }
//                     />

//                   ))}

//                 </div>


//                 {/* COMMENT */}

//                 <p className="mt-4 text-gray-700">
//                   {comment}
//                 </p>


//                 {/* CLASS RATING */}

//                 {review.classRating && (

//                   <p className="mt-3 text-sm text-gray-500">
//                     Class Rating: ⭐ {review.classRating}/5
//                   </p>

//                 )}

//               </div>

//             );
//           })}

//         </div>

//       )}

//     </div>
//   );
// }

// export default TrainerReviews;

import { useEffect, useState } from "react";
import { FaStar, FaUser } from "react-icons/fa";
import api from "../../Service/api";

const getStoredUser = () => {
  const keys = ["user", "trainer", "userData"];

  for (const key of keys) {
    try {
      const value = localStorage.getItem(key);

      if (value) {
        const parsed = JSON.parse(value);

        if (parsed) {
          return parsed;
        }
      }
    } catch {
      // Ignore invalid localStorage data
    }
  }

  return null;
};

function TrainerReviews() {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUser = getStoredUser();

  const trainerId =
    storedUser?._id ||
    storedUser?.id ||
    localStorage.getItem("userId");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError("");

        if (!trainerId) {
          setError(
            "Trainer information not found. Please login again."
          );
          return;
        }

        const response = await api.get(
          `/trainers/reviews/${trainerId}`
        );

        if (response.data?.success) {
          setReviews(response.data.reviews || []);
          setAverageRating(
            Number(response.data.averageRating) || 0
          );
        } else {
          setError(
            response.data?.message ||
              "Failed to load reviews"
          );
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load reviews"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [trainerId]);

  if (loading) {
    return (
      <div className="min-h-40 flex items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading reviews...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-32 bg-red-50 border border-red-200 text-red-600 rounded-xl flex flex-col justify-center gap-2">
        <h2 className="font-bold text-lg">
          Unable to load reviews
        </h2>

        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-800">
          Student Reviews
        </h1>

        <p className="text-gray-500">
          See what your students think about your classes.
        </p>
      </div>

      {/* Rating Summary */}
      <div className="bg-white shadow rounded-xl border border-gray-100 min-h-32 flex items-center">
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">
              Average Trainer Rating
            </p>

            <p className="text-4xl font-bold text-gray-800">
              {averageRating.toFixed(1)}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex gap-1 text-xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={
                    star <= Math.round(averageRating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <p className="text-sm text-gray-500">
              {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {reviews.length === 0 ? (
        <div className="bg-white shadow rounded-xl min-h-64 flex flex-col items-center justify-center gap-4 text-center border border-gray-100">
          <FaStar className="text-5xl text-gray-300" />

          <h2 className="text-xl font-semibold text-gray-700">
            No Reviews Yet
          </h2>

          <p className="text-gray-500">
            Student reviews will appear here after they submit
            feedback.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {reviews.map((review) => {
            const studentName =
              review.user?.name ||
              review.student?.name ||
              "Student";

            const rating =
              Number(review.trainerRating) || 0;

            const comment =
              review.trainerFeedback ||
              review.comment ||
              review.feedback ||
              review.message ||
              "No feedback provided.";

            const className =
              review.class?.name ||
              review.class?.title ||
              review.class?.className ||
              "Fitness Class";

            return (
              <div
                key={review._id}
                className="bg-white shadow-lg rounded-xl border border-gray-100 min-h-48 flex flex-col gap-5"
              >
                {/* Student */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                    {review.user?.profileImage ? (
                      <img
                        src={review.user.profileImage}
                        alt={studentName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-blue-600" />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-gray-800">
                      {studentName}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {className}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 text-xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-700 leading-relaxed">
                  {comment}
                </p>

                {/* Class Rating */}
                {review.classRating !== undefined &&
                  review.classRating !== null && (
                    <p className="text-sm text-gray-500">
                      Class Rating: ⭐ {review.classRating}/5
                    </p>
                  )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TrainerReviews;