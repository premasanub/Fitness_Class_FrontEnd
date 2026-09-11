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
      <div className="min-h-40 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {/* HEADER */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-gray-900">
          Refer Friends & Family
        </h1>

        <p className="text-gray-500">
          Invite your friends and earn exciting rewards.
        </p>
      </div>

      {/* OFFER */}
      {offer && (
        <div className="bg-red-500 text-white rounded-xl shadow min-h-32 flex items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 shrink-0 bg-white/20 rounded-full flex items-center justify-center">
              <FaGift className="text-2xl" />
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">
                {offer.title || "Referral Offer"}
              </h2>

              <p className="text-red-100">
                {offer.description ||
                  "Refer your friends and enjoy exciting rewards."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-600 text-white rounded-xl shadow min-h-36 flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2>Successful Referrals</h2>

            <h1 className="text-4xl font-bold">
              {referral.referralCount}
            </h1>
          </div>

          <FaUsers className="text-4xl opacity-80" />
        </div>

        <div className="bg-purple-600 text-white rounded-xl shadow min-h-36 flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2>Your Referral Code</h2>

            <h1 className="text-3xl font-bold tracking-wider break-all">
              {referral.referralCode || "N/A"}
            </h1>
          </div>

          <FaGift className="text-4xl opacity-80 shrink-0" />
        </div>
      </div>

      {/* REFERRAL LINK */}
      <div className="bg-white rounded-xl shadow border border-gray-100 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <FaLink className="text-red-500 text-xl" />

          <h2 className="text-xl font-bold">
            Your Referral Link
          </h2>
        </div>

        <p className="text-gray-500">
          Share this link with your friends to invite them.
        </p>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 min-h-12 bg-gray-100 border border-gray-200 rounded-lg flex items-center">
            <p className="text-sm text-gray-700 break-all">
              {referral.referralLink ||
                "No referral link available"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="min-h-12 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 transition"
          >
            <FaCopy />
            Copy Link
          </button>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="min-h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center gap-2 transition"
        >
          <FaShareAlt />
          Share Referral Link
        </button>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-white rounded-xl shadow border border-gray-100 flex flex-col gap-6">
        <h2 className="text-2xl font-bold">
          How It Works
        </h2>

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
  );
}

function Step({ number, title, description }) {
  return (
    <div className="text-center flex flex-col items-center gap-3">
      <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center font-bold text-xl">
        {number}
      </div>

      <h3 className="font-bold">{title}</h3>

      <p className="text-gray-500 text-sm">
        {description}
      </p>
    </div>
  );
}

export default ReferralOffer;