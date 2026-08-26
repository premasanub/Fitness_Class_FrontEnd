import React, { useEffect, useState } from "react";
import axios from "axios";

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

  const API_URL = "https://fitness-class-backend.onrender.com/api";

  // GET EXISTING OFFER
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${API_URL}/admin/referral-offer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success && res.data.offer) {
          const offer = res.data.offer;

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
        console.log("Fetch Referral Offer Error:", error);
      }
    };

    fetchOffer();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API_URL}/admin/referral-offer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setMessage("Referral offer updated successfully!");
      }
    } catch (error) {
      console.log("Update Referral Offer Error:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to update referral offer"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Referral Offer Management
          </h1>

          <p className="text-gray-500 mt-1">
            Create and manage the referral offer for users.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div>
              <label className="block font-medium mb-2">
                Offer Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Refer a Friend & Get 20% Off"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Invite your friends and earn rewards..."
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block font-medium mb-2">
                Discount
              </label>

              <input
                type="text"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="20%"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email Subject */}
            <div>
              <label className="block font-medium mb-2">
                Email Subject
              </label>

              <input
                type="text"
                name="emailSubject"
                value={formData.emailSubject}
                onChange={handleChange}
                placeholder="Refer your friends and earn rewards!"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Message */}
            <div>
              <label className="block font-medium mb-2">
                Email Message
              </label>

              <textarea
                name="emailMessage"
                value={formData.emailMessage}
                onChange={handleChange}
                rows="6"
                placeholder="Share your referral link with your friends..."
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Expiry */}
            <div>
              <label className="block font-medium mb-2">
                Expiry Date
              </label>

              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status */}
            <div className="border-t pt-5 space-y-4">

              <label className="flex items-center justify-between">
                <div>
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
                  className="w-5 h-5"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
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
                  className="w-5 h-5"
                />
              </label>

            </div>

            {/* Message */}
            {message && (
              <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg">
                {message}
              </div>
            )}

            {/* Save */}
            <div className="flex justify-end pt-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : "Save Referral Offer"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ReferralOfferManagement;