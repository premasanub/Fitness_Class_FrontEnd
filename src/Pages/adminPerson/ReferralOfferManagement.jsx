import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../Service/api";

const ReferralOfferManagement = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: "",
    emailSubject: "",
    emailMessage: "",
    expiryDate: "",
    isActive: true,
    weeklyEmailEnabled: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await api.get(
          "/admin/referral-offer"
        );

        if (response.data.success && response.data.offer) {
          const offer = response.data.offer;

          setFormData({
            title: offer.title || "",
            description: offer.description || "",
            discount: offer.discount || "",
            emailSubject: offer.emailSubject || "",
            emailMessage: offer.emailMessage || "",
            expiryDate: offer.expiryDate
              ? offer.expiryDate.split("T")[0]
              : "",
            isActive: offer.isActive ?? true,
            weeklyEmailEnabled:
              offer.weeklyEmailEnabled ?? false,
          });
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "Failed to load referral offer";

        setMessage(errorMessage);
        toast.error(errorMessage);
      }
    };

    fetchOffer();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await api.put(
        "/admin/referral-offer",
        formData
      );

      if (response.data.success) {
        const successMessage =
          "Referral offer updated successfully!";

        setMessage(successMessage);
        toast.success(successMessage);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to update referral offer";

      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col gap-8">

      {/* Header */}
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-800">
          Referral Offer Management
        </h1>

        <p className="text-gray-500">
          Create and manage the referral offer for users.
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200">

        <form
          onSubmit={handleSubmit}
          className="w-[92%] self-center flex flex-col gap-6"
        >

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="font-medium text-gray-700"
            >
              Offer Title
            </label>

            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Refer a Friend & Get 20% Off"
              className="w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 indent-3"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Invite your friends and earn rewards..."
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 indent-3"
              required
            />
          </div>

          {/* Discount */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="discount"
              className="font-medium text-gray-700"
            >
              Discount
            </label>

            <input
              id="discount"
              type="text"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="20%"
              className="w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 indent-3"
              required
            />
          </div>

          {/* Email Subject */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="emailSubject"
              className="font-medium text-gray-700"
            >
              Email Subject
            </label>

            <input
              id="emailSubject"
              type="text"
              name="emailSubject"
              value={formData.emailSubject}
              onChange={handleChange}
              placeholder="Refer your friends and earn rewards!"
              className="w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 indent-3"
            />
          </div>

          {/* Email Message */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="emailMessage"
              className="font-medium text-gray-700"
            >
              Email Message
            </label>

            <textarea
              id="emailMessage"
              name="emailMessage"
              value={formData.emailMessage}
              onChange={handleChange}
              rows="6"
              placeholder="Share your referral link with your friends..."
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 indent-3"
            />
          </div>

          {/* Expiry */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="expiryDate"
              className="font-medium text-gray-700"
            >
              Expiry Date
            </label>

            <input
              id="expiryDate"
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full sm:w-72 h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 indent-3"
            />
          </div>

          {/* Settings */}
          <div className="border-t border-gray-200 flex flex-col gap-5">

            {/* Active */}
            <label className="min-h-16 flex items-center justify-between gap-6 cursor-pointer">
              <div className="flex flex-col gap-1">
                <p className="font-medium text-gray-800">
                  Referral Offer Active
                </p>

                <p className="text-sm text-gray-500">
                  Users can see and use this offer
                </p>
              </div>

              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-5 h-5 shrink-0"
              />
            </label>

            {/* Weekly Email */}
            <label className="min-h-16 flex items-center justify-between gap-6 cursor-pointer">
              <div className="flex flex-col gap-1">
                <p className="font-medium text-gray-800">
                  Weekly Email Enabled
                </p>

                <p className="text-sm text-gray-500">
                  Send referral offer emails weekly
                </p>
              </div>

              <input
                type="checkbox"
                name="weeklyEmailEnabled"
                checked={formData.weeklyEmailEnabled}
                onChange={handleChange}
                className="w-5 h-5 shrink-0"
              />
            </label>

          </div>

          {/* Message */}
          {message && (
            <div
              className={`min-h-12 rounded-lg flex items-center ${
                message.includes("successfully")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <span className="indent-3">
                {message}
              </span>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-56 min-h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 transition flex items-center justify-center"
            >
              {loading
                ? "Saving..."
                : "Save Referral Offer"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ReferralOfferManagement;