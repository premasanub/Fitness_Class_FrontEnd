import { useEffect, useState } from "react";
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
        setLoading(true);

        const response = await api.get("/referral");

        if (response.data?.success) {
          setReferral(
            response.data.referral || {
              referralCode: "",
              referralLink: "",
              referralCount: 0,
            }
          );

          setOffer(response.data.offer || null);
        } else {
          toast.error(
            response.data?.message ||
              "Failed to load referral details"
          );
        }
      } catch (error) {
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
    if (!referral.referralLink) {
      toast.error("Referral link is not available");
      return;
    }

    try {
      await navigator.clipboard.writeText(
        referral.referralLink
      );

      toast.success("Referral link copied!");
    } catch {
      toast.error("Failed to copy referral link");
    }
  };

  const handleShare = async () => {
    if (!referral.referralLink) {
      toast.error("Referral link is not available");
      return;
    }

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
    } catch {
      // User cancelled native share
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <div className="w-12 h-12 border-4 border-red-200 border-t-red-500 rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-red-500 font-semibold text-sm uppercase tracking-wide">
            Referral Program
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
            Refer Friends & Family
          </h1>

          <p className="text-gray-500 mt-2">
            Invite your friends and earn exciting rewards.
          </p>
        </div>

        {/* OFFER */}
        {offer && (
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="w-16 h-16 shrink-0 bg-white/20 rounded-2xl flex items-center justify-center">
                <FaGift className="text-3xl" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {offer.title ||
                    "Referral Offer"}
                </h2>

                <p className="text-red-100 mt-2 leading-6">
                  {offer.description ||
                    "Refer your friends and enjoy exciting rewards."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Successful Referrals
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {referral.referralCount}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaUsers className="text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-purple-600 text-white rounded-2xl shadow-lg p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-purple-100 text-sm font-medium">
                  Your Referral Code
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-wider break-all mt-2">
                  {referral.referralCode ||
                    "N/A"}
                </h2>
              </div>

              <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaGift className="text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* REFERRAL LINK */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <FaLink className="text-red-500" />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Your Referral Link
            </h2>
          </div>

          <p className="text-gray-500 mb-5">
            Share this link with your friends to invite
            them.
          </p>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 min-h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center">
              <p className="text-sm text-gray-700 break-all">
                {referral.referralLink ||
                  "No referral link available"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="min-h-12 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center gap-2 font-semibold transition"
            >
              <FaCopy />
              Copy Link
            </button>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="w-full min-h-12 mt-4 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl flex items-center justify-center gap-2 font-semibold transition"
          >
            <FaShareAlt />
            Share Referral Link
          </button>
        </div>

        {/* HOW IT WORKS */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-900">
              How It Works
            </h2>

            <p className="text-gray-500 mt-1">
              Refer friends in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Step
              number="1"
              title="Share Your Link"
              description="Copy your referral link and share it with your friends and family."
            />

            <Step
              number="2"
              title="Friend Registers"
              description="Your friend creates an account using your referral link."
            />

            <Step
              number="3"
              title="Earn Rewards"
              description="Once the referral is completed, you can receive the applicable reward."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
      <div className="w-12 h-12 mx-auto bg-red-100 text-red-500 rounded-full flex items-center justify-center font-bold text-xl mb-4">
        {number}
      </div>

      <h3 className="font-bold text-gray-900">
        {title}
      </h3>

      <p className="text-gray-500 text-sm mt-2 leading-6">
        {description}
      </p>
    </div>
  );
}

export default ReferralOffer;