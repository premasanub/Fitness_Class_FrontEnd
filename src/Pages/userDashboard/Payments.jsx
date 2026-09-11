// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import api from "../../Service/api";

// function Payments() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const classData = location.state?.classData;
//   const selectedSlot = location.state?.selectedSlot;

//   const [loading, setLoading] = useState(false);

//   // Directly payment page open pannina
//   if (!classData || !selectedSlot) {
//     return (
//       <div className="p-6 text-center">
//         <h2 className="text-2xl font-bold text-red-500">
//           Booking details not found
//         </h2>

//         <p className="mt-2 text-gray-600">
//           Please select a class and time slot first.
//         </p>

//         <button
//           onClick={() => navigate("/dashboard/classes")}
//           className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//         >
//           Go to Classes
//         </button>
//       </div>
//     );
//   }

//   // =====================================================
//   // RAZORPAY PAYMENT
//   // =====================================================

//   const handlePayment = async () => {
//     try {
//       setLoading(true);

//       const user = JSON.parse(localStorage.getItem("user"));

//       if (!user?._id) {
//         alert("Please login again.");
//         setLoading(false);
//         return;
//       }

//       // =================================================
//       // STEP 1: CREATE RAZORPAY ORDER
//       // =================================================

//       const orderResponse = await api.post(
//         "/payment/create-order",
//         {
//           amount: classData.price,
//         }
//       );

//       console.log("ORDER RESPONSE:", orderResponse.data);

//       const order = orderResponse.data;

//       // =================================================
//       // STEP 2: OPEN RAZORPAY CHECKOUT
//       // =================================================

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,

//         amount: order.amount,

//         currency: order.currency,

//         name: "Fitness Booking",

//         description: `${classData.title} Booking`,

//         order_id: order.id,

//         handler: async function (response) {
//           try {
//             console.log("RAZORPAY RESPONSE:", response);

//             // =============================================
//             // STEP 3: VERIFY PAYMENT
//             // =============================================

//             const verifyResponse = await api.post(
//               "/payment/verify",
//               {
//                 razorpay_order_id:
//                   response.razorpay_order_id,

//                 razorpay_payment_id:
//                   response.razorpay_payment_id,

//                 razorpay_signature:
//                   response.razorpay_signature,
//               }
//             );

//             console.log(
//               "VERIFY RESPONSE:",
//               verifyResponse.data
//             );

//             if (!verifyResponse.data.success) {
//               alert("Payment verification failed.");
//               setLoading(false);
//               return;
//             }

//             // =============================================
//             // STEP 4: CREATE BOOKING
//             // =============================================

//             const bookingData = {
//               user: user._id,

//               classId: classData._id,

//               trainer:
//                 classData.trainer?._id ||
//                 classData.trainer,

//               selectedSlot: selectedSlot,

//               // Payment details
//               paymentStatus: "Paid",

//               razorpayOrderId:
//                 response.razorpay_order_id,

//               razorpayPaymentId:
//                 response.razorpay_payment_id,
//             };

//             console.log(
//               "BOOKING DATA:",
//               bookingData
//             );

//             const bookingResponse = await api.post(
//               "/bookings",
//               bookingData
//             );

//             console.log(
//               "BOOKING RESPONSE:",
//               bookingResponse.data
//             );

//             // =============================================
//             // SUCCESS
//             // =============================================

//             alert(
//               "Payment Successful! Booking Confirmed."
//             );

//             navigate("/dashboard/bookings");

//           } catch (error) {
//             console.log(
//               "VERIFY / BOOKING ERROR:",
//               error.response?.data ||
//                 error.message
//             );

//             alert(
//               error.response?.data?.message ||
//                 "Payment verification failed."
//             );

//             setLoading(false);
//           }
//         },

//         prefill: {
//           name: user.name || "",
//           email: user.email || "",
//           contact: user.phone || "",
//         },

//         notes: {
//           classId: classData._id,
//           selectedSlot: selectedSlot,
//         },

//         theme: {
//           color: "#16a34a",
//         },

//         modal: {
//           ondismiss: function () {
//             console.log(
//               "Razorpay payment popup closed"
//             );

//             setLoading(false);
//           },
//         },
//       };

//       // =================================================
//       // CHECK RAZORPAY SCRIPT
//       // =================================================

//       if (!window.Razorpay) {
//         alert(
//           "Razorpay SDK not loaded. Please refresh the page."
//         );

//         setLoading(false);
//         return;
//       }

//       const razorpay = new window.Razorpay(options);

//       razorpay.on(
//         "payment.failed",
//         function (response) {
//           console.log(
//             "PAYMENT FAILED:",
//             response.error
//           );

//           alert(
//             response.error?.description ||
//               "Payment failed."
//           );

//           setLoading(false);
//         }
//       );

//       razorpay.open();

//     } catch (error) {
//       console.log(
//         "PAYMENT ERROR:",
//         error.response?.data ||
//           error.message
//       );

//       alert(
//         error.response?.data?.message ||
//           "Unable to start payment."
//       );

//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">

//       <h1 className="text-3xl font-bold mb-8">
//         Payment
//       </h1>

//       {/* ============================
//           BOOKING SUMMARY
//       ============================ */}

//       <div className="bg-white shadow-lg rounded-xl p-6 mb-6">

//         <h2 className="text-2xl font-bold mb-4">
//           Booking Summary
//         </h2>

//         <div className="space-y-3">

//           <p>
//             <strong>Class:</strong>{" "}
//             {classData.title}
//           </p>

//           <p>
//             <strong>Category:</strong>{" "}
//             {classData.category}
//           </p>

//           <p>
//             <strong>Trainer:</strong>{" "}
//             {classData.trainer?.name ||
//               "Not assigned"}
//           </p>

//           <p>
//             <strong>Date:</strong>{" "}
//             {classData.date}
//           </p>

//           <p>
//             <strong>Selected Slot:</strong>{" "}
//             {selectedSlot}
//           </p>

//           <p>
//             <strong>Duration:</strong>{" "}
//             {classData.duration} mins
//           </p>

//           <p className="text-xl font-bold">
//             <strong>Amount:</strong>{" "}
//             ₹{classData.price}
//           </p>

//         </div>
//       </div>

//       {/* ============================
//           RAZORPAY
//       ============================ */}

//       <div className="bg-gray-50 border rounded-xl p-6">

//         <h2 className="text-xl font-bold mb-5">
//           Payment Method
//         </h2>

//         <div className="border p-4 rounded-lg bg-white">

//           <p className="font-semibold">
//             Razorpay
//           </p>

//           <p className="text-gray-500 text-sm mt-1">
//             UPI, Credit/Debit Card, Net Banking
//           </p>

//         </div>

//         <button
//           onClick={handlePayment}
//           disabled={loading}
//           className={`w-full mt-6 py-3 rounded-lg text-white font-semibold ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-green-600 hover:bg-green-700"
//           }`}
//         >
//           {loading
//             ? "Processing..."
//             : `Pay ₹${classData.price}`}
//         </button>

//       </div>

//     </div>
//   );
// }

// export default Payments;

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../Service/api";

const getStoredUser = () => {
  try {
    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

function Payments() {
  const location = useLocation();
  const navigate = useNavigate();

  const classData = location.state?.classData;
  const selectedSlot = location.state?.selectedSlot;

  const [loading, setLoading] = useState(false);

  if (!classData || !selectedSlot) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-red-500">
            Booking Details Not Found
          </h2>

          <p className="text-gray-600">
            Please select a class and time slot first.
          </p>

          <button
            onClick={() =>
              navigate("/dashboard/classes")
            }
            className="min-h-11 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
          >
            Go to Classes
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      setLoading(true);

      const user = getStoredUser();

      if (!user?._id) {
        toast.error(
          "User information not found. Please login again."
        );
        return;
      }

      if (Number(classData.seats) <= 0) {
        toast.error(
          "No seats are available for this class."
        );
        return;
      }

      const orderResponse = await api.post(
        "/payment/create-order",
        {
          amount: classData.price,
        }
      );

      const order = orderResponse.data;

      if (!order?.id) {
        toast.error(
          "Unable to create payment order."
        );
        return;
      }

      if (!window.Razorpay) {
        toast.error(
          "Razorpay SDK not loaded. Please refresh the page."
        );
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "Fitness Booking",

        description: `${classData.title} Booking`,

        order_id: order.id,

        handler: async function (response) {
          try {
            const verifyResponse =
              await api.post(
                "/payment/verify",
                {
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,
                }
              );

            if (!verifyResponse.data?.success) {
              toast.error(
                "Payment verification failed."
              );
              setLoading(false);
              return;
            }

            const bookingData = {
              user: user._id,

              classId: classData._id,

              trainer:
                classData.trainer?._id ||
                classData.trainer,

              selectedSlot,

              paymentStatus: "Paid",

              razorpayOrderId:
                response.razorpay_order_id,

              razorpayPaymentId:
                response.razorpay_payment_id,
            };

            const bookingResponse =
              await api.post(
                "/bookings",
                bookingData
              );

            if (
              bookingResponse.data?.success ===
              false
            ) {
              toast.error(
                bookingResponse.data?.message ||
                  "Booking could not be created."
              );
              setLoading(false);
              return;
            }

            toast.success(
              "Payment successful! Booking confirmed."
            );

            navigate("/dashboard/bookings");
          } catch (error) {
            toast.error(
              error.response?.data?.message ||
                "Payment verification failed."
            );

            setLoading(false);
          }
        },

        prefill: {
          name: user.name || "",
          email: user.email || "",
          contact: user.phone || "",
        },

        notes: {
          classId: classData._id,
          selectedSlot,
        },

        theme: {
          color: "#16a34a",
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          toast.error(
            response.error?.description ||
              "Payment failed."
          );

          setLoading(false);
        }
      );

      razorpay.open();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to start payment."
      );

      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Payment
        </h1>

        <p className="text-gray-500">
          Review your booking before completing payment.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl border border-gray-100 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Booking Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg min-h-16 flex flex-col justify-center">
            <span className="text-sm text-gray-500">
              Class
            </span>

            <strong className="text-gray-800">
              {classData.title}
            </strong>
          </div>

          <div className="border border-gray-200 rounded-lg min-h-16 flex flex-col justify-center">
            <span className="text-sm text-gray-500">
              Category
            </span>

            <strong className="text-gray-800">
              {classData.category}
            </strong>
          </div>

          <div className="border border-gray-200 rounded-lg min-h-16 flex flex-col justify-center">
            <span className="text-sm text-gray-500">
              Trainer
            </span>

            <strong className="text-gray-800">
              {classData.trainer?.name ||
                "Not assigned"}
            </strong>
          </div>

          <div className="border border-gray-200 rounded-lg min-h-16 flex flex-col justify-center">
            <span className="text-sm text-gray-500">
              Date
            </span>

            <strong className="text-gray-800">
              {classData.date}
            </strong>
          </div>

          <div className="border border-gray-200 rounded-lg min-h-16 flex flex-col justify-center">
            <span className="text-sm text-gray-500">
              Selected Slot
            </span>

            <strong className="text-blue-600">
              {selectedSlot}
            </strong>
          </div>

          <div className="border border-gray-200 rounded-lg min-h-16 flex flex-col justify-center">
            <span className="text-sm text-gray-500">
              Duration
            </span>

            <strong className="text-gray-800">
              {classData.duration} mins
            </strong>
          </div>
        </div>

        <div className="border-t border-gray-200 min-h-16 flex items-center justify-between gap-4">
          <span className="font-semibold text-gray-700">
            Total Amount
          </span>

          <strong className="text-2xl text-blue-600">
            ₹{classData.price}
          </strong>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl flex flex-col gap-6">
        <h2 className="text-xl font-bold text-gray-900">
          Payment Method
        </h2>

        <div className="border border-gray-200 rounded-lg bg-white min-h-20 flex flex-col justify-center gap-1">
          <p className="font-semibold text-gray-800">
            Razorpay
          </p>

          <p className="text-gray-500 text-sm">
            UPI, Credit/Debit Card, Net Banking
          </p>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full min-h-12 rounded-lg text-white font-semibold flex items-center justify-center transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading
            ? "Processing..."
            : `Pay ₹${classData.price}`}
        </button>
      </div>
    </div>
  );
}

export default Payments;