import React, { useEffect, useState } from "react";
import api from "../../Service/api";
import { toast } from "react-toastify";
import {
  FaGift,
  FaUsers,
  FaLink,
  FaCopy,
  FaShareAlt,
} from "react-icons/fa";

function ReferralOffer() {
  const [referral, setReferral] = useState({
    referralCode: "",
    referralLink: "",
    referralCount: 0,
  });

  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferralDetails = async () => {
      try {
        const response = await api.get("/referral");

        console.log("Referral Response:", response.data);

        if (response.data.success) {
          setReferral(response.data.referral);
          setOffer(response.data.offer);
        }
      } catch (error) {
        console.error("Referral Axios Error:", error);
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("URL:", error.config?.url);

        toast.error(
          error.response?.data?.message ||
            "Failed to load referral details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReferralDetails();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        referral.referralLink
      );

      toast.success("Referral link copied!");
    } catch (error) {
      toast.error("Failed to copy referral link");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: offer?.title || "Referral Offer",
          text:
            offer?.description ||
            "Join using my referral link!",
          url: referral.referralLink,
        });
      } else {
        await navigator.clipboard.writeText(
          referral.referralLink
        );

        toast.success("Referral link copied!");
      }
    } catch (error) {
      console.error("Share Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <h1 className="text-4xl font-bold">
        Refer Friends & Family
      </h1>

      <p className="text-gray-500 mt-2">
        Invite your friends and earn exciting rewards.
      </p>

      {/* Offer */}
      {offer && (
        <div className="mt-8 bg-red-500 text-white p-6 rounded-xl shadow">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-full">
              <FaGift className="text-2xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {offer.title || "Referral Offer"}
              </h2>

              <p className="mt-1 text-red-100">
                {offer.description ||
                  "Refer your friends and enjoy exciting rewards."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <div>
              <h2>Successful Referrals</h2>

              <h1 className="text-4xl font-bold mt-3">
                {referral.referralCount}
              </h1>
            </div>

            <FaUsers className="text-4xl opacity-80" />
          </div>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <div>
              <h2>Your Referral Code</h2>

              <h1 className="text-3xl font-bold mt-3 tracking-wider">
                {referral.referralCode || "N/A"}
              </h1>
            </div>

            <FaGift className="text-4xl opacity-80" />
          </div>
        </div>

      </div>

      {/* Referral Link */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">

        <div className="flex items-center gap-3">
          <FaLink className="text-red-500 text-xl" />

          <h2 className="text-xl font-bold">
            Your Referral Link
          </h2>
        </div>

        <p className="text-gray-500 mt-2">
          Share this link with your friends to invite them.
        </p>

        <div className="flex flex-col md:flex-row gap-3 mt-5">

          <div className="flex-1 bg-gray-100 border border-gray-200 rounded-lg px-4 py-3">
            <p className="text-sm text-gray-700 break-all">
              {referral.referralLink ||
                "No referral link available"}
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <FaCopy />
            Copy Link
          </button>

        </div>

        <button
          onClick={handleShare}
          className="mt-4 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <FaShareAlt />
          Share Referral Link
        </button>

      </div>

      {/* How It Works */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">

        <h2 className="text-2xl font-bold">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-red-100 text-red-500 rounded-full flex items-center justify-center font-bold text-xl">
              1
            </div>

            <h3 className="font-bold mt-4">
              Share Your Link
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Copy your referral link and share it with
              your friends and family.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-red-100 text-red-500 rounded-full flex items-center justify-center font-bold text-xl">
              2
            </div>

            <h3 className="font-bold mt-4">
              Friend Registers
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Your friend creates an account using your
              referral link.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-red-100 text-red-500 rounded-full flex items-center justify-center font-bold text-xl">
              3
            </div>

            <h3 className="font-bold mt-4">
              Earn Rewards
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Once the referral is completed, you can
              receive the applicable reward.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ReferralOffer;