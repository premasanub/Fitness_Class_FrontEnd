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
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-2xl">
            !
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Booking Details Not Found
          </h2>

          <p className="text-gray-500 mt-3">
            Please select a class and time slot first.
          </p>

          <button
            onClick={() =>
              navigate("/dashboard/classes")
            }
            className="w-full min-h-12 mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Payment
          </h1>

          <p className="text-gray-500 mt-2">
            Review your booking before completing
            payment.
          </p>
        </div>

        {/* BOOKING SUMMARY */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
                Booking Summary
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {classData.title}
              </h2>
            </div>

            <div className="hidden sm:flex w-12 h-12 rounded-xl bg-blue-50 items-center justify-center text-blue-600 text-xl">
              ₹
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem
              label="Class"
              value={classData.title}
            />

            <InfoItem
              label="Category"
              value={classData.category}
            />

            <InfoItem
              label="Trainer"
              value={
                classData.trainer?.name ||
                "Not assigned"
              }
            />

            <InfoItem
              label="Date"
              value={classData.date}
            />

            <InfoItem
              label="Selected Slot"
              value={selectedSlot}
              highlight
            />

            <InfoItem
              label="Duration"
              value={`${classData.duration} mins`}
            />
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between gap-4">
            <span className="font-semibold text-gray-700">
              Total Amount
            </span>

            <strong className="text-2xl text-blue-600">
              ₹{classData.price}
            </strong>
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
          <div className="mb-5">
            <p className="text-sm text-green-600 font-semibold uppercase tracking-wide">
              Secure Payment
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-1">
              Payment Method
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
            <p className="font-semibold text-gray-800">
              Razorpay
            </p>

            <p className="text-gray-500 text-sm mt-1">
              UPI, Credit/Debit Card, Net Banking
            </p>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full min-h-12 px-6 py-3 rounded-xl text-white font-semibold flex items-center justify-center transition ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading
              ? "Processing..."
              : `Pay ₹${classData.price}`}
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  highlight,
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
      <p className="text-sm text-gray-500 mb-2">
        {label}
      </p>

      <p
        className={`font-semibold ${
          highlight
            ? "text-blue-600"
            : "text-gray-800"
        }`}
      >
        {value || "N/A"}
      </p>
    </div>
  );
}

export default Payments;