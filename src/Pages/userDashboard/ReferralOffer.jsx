import { useEffect, useState } from "react";
import axios from "axios";
import { FaGift, FaUsers, FaEnvelope, FaCheckCircle } from "react-icons/fa";

const API_URL = "https://fitness-class-backend.onrender.com/api";

const ReferralOffer = () => {
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // ============================================
  // GET REFERRAL DETAILS
  // ============================================
  const fetchReferralDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/referral/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReferral(response.data);
    } catch (err) {
      console.error("Referral details error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load referral details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferralDetails();
  }, []);

  // ============================================
  // SEND REFERRAL EMAIL
  // ============================================
  const handleReferFriends = async () => {
    try {
      setSending(true);
      setMessage("");
      setError("");

      const response = await axios.post(
        `${API_URL}/referral/send-email`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data?.message ||
          "Referral email sent successfully!"
      );
    } catch (err) {
      console.error("Referral email error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to send referral email"
      );
    } finally {
      setSending(false);
    }
  };

  // ============================================
  // LOADING
  // ============================================
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ============================================
  // ERROR
  // ============================================
  if (error && !referral) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Referral & Offers
        </h1>

        <p className="text-gray-500 mt-1">
          Refer your friends and earn exciting rewards.
        </p>
      </div>

      {/* Referral Banner */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 md:p-8 text-white shadow-lg">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div className="flex items-center gap-4">

            <div className="bg-white/20 p-4 rounded-full">
              <FaGift className="text-3xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Refer Your Friends
              </h2>

              <p className="text-red-100 mt-1">
                Invite your friends and earn rewards.
              </p>
            </div>

          </div>

          {/* Refer Button */}
          <button
            onClick={handleReferFriends}
            disabled={sending}
            className="flex items-center justify-center gap-2 bg-white text-red-600 font-semibold px-6 py-3 rounded-xl hover:bg-red-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FaEnvelope />

            {sending
              ? "Sending..."
              : "Refer Your Friends"}
          </button>

        </div>

      </div>

      {/* Success Message */}
      {message && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl">
          <FaCheckCircle />
          <span>{message}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Referral Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Referral Code */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="bg-red-100 text-red-500 p-4 rounded-full">
              <FaGift className="text-xl" />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Your Referral Code
              </p>

              <h2 className="text-2xl font-bold text-gray-800 tracking-wider">
                {referral?.referralCode ||
                  referral?.user?.referralCode ||
                  "N/A"}
              </h2>
            </div>

          </div>

        </div>

        {/* Referral Count */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="bg-blue-100 text-blue-500 p-4 rounded-full">
              <FaUsers className="text-xl" />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Friends Referred
              </p>

              <h2 className="text-3xl font-bold text-gray-800">
                {referral?.referralCount ??
                  referral?.user?.referralCount ??
                  0}
              </h2>
            </div>

          </div>

        </div>

      </div>

      {/* Offer */}
      {(referral?.offer || referral?.data?.offer) && (
        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-4 mb-6">

            <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full">
              <FaGift className="text-xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {(referral?.offer || referral?.data?.offer)?.title}
              </h2>

              <p className="text-gray-500">
                {(referral?.offer || referral?.data?.offer)?.description}
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Required Referrals
              </p>

              <p className="text-2xl font-bold text-gray-800">
                {(referral?.offer || referral?.data?.offer)
                  ?.requiredReferrals || 0}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Your Referrals
              </p>

              <p className="text-2xl font-bold text-red-500">
                {referral?.referralCount ??
                  referral?.user?.referralCount ??
                  0}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Reward
              </p>

              <p className="text-2xl font-bold text-green-600">
                {(referral?.offer || referral?.data?.offer)?.reward}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* How It Works */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm">

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="text-center">

            <div className="w-12 h-12 mx-auto bg-red-100 text-red-500 rounded-full flex items-center justify-center font-bold text-lg">
              1
            </div>

            <h3 className="font-semibold text-gray-800 mt-3">
              Click Refer
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Click the Refer Your Friends button.
            </p>

          </div>

          <div className="text-center">

            <div className="w-12 h-12 mx-auto bg-red-100 text-red-500 rounded-full flex items-center justify-center font-bold text-lg">
              2
            </div>

            <h3 className="font-semibold text-gray-800 mt-3">
              Share Referral
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Your referral email will be sent.
            </p>

          </div>

          <div className="text-center">

            <div className="w-12 h-12 mx-auto bg-red-100 text-red-500 rounded-full flex items-center justify-center font-bold text-lg">
              3
            </div>

            <h3 className="font-semibold text-gray-800 mt-3">
              Earn Reward
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Get rewards when your friends join.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ReferralOffer;