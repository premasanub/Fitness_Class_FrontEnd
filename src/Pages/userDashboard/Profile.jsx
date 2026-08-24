import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaVenusMars,
  FaRulerVertical,
  FaWeight,
  FaBullseye,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../Service/api";

function Profile() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    address: "",
  });

  // =====================================================
  // FETCH PROFILE
  // =====================================================

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await api.get("/user/profile");

      console.log("PROFILE RESPONSE:", response.data);

      const userData =
        response.data.user || response.data;

      if (!userData) {
        toast.error("Profile not found");
        return;
      }

      setUser(userData);

      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        age: userData.age ?? "",
        gender: userData.gender || "",
        height: userData.height ?? "",
        weight: userData.weight ?? "",
        goal: userData.goal || "",
        address: userData.address || "",
      });
    } catch (error) {
      console.error(
        "PROFILE ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // EDIT PROFILE
  // =====================================================

  const handleEdit = () => {
    setEditing(true);
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancel = () => {
    if (!user) return;

    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      age: user.age ?? "",
      gender: user.gender || "",
      height: user.height ?? "",
      weight: user.weight ?? "",
      goal: user.goal || "",
      address: user.address || "",
    });

    setEditing(false);
  };

  // =====================================================
  // UPDATE PROFILE
  // =====================================================

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await api.put(
        "/user/profile",
        formData
      );

      console.log(
        "UPDATE PROFILE RESPONSE:",
        response.data
      );

      const updatedUser =
        response.data.user || response.data;

      setUser(updatedUser);

      setFormData({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        age: updatedUser.age ?? "",
        gender: updatedUser.gender || "",
        height: updatedUser.height ?? "",
        weight: updatedUser.weight ?? "",
        goal: updatedUser.goal || "",
        address: updatedUser.address || "",
      });

      // =================================================
      // UPDATE LOCAL STORAGE
      // =================================================

      const storedUser =
        localStorage.getItem("user");

      if (storedUser) {
        const oldUser = JSON.parse(storedUser);

        const newUser = {
          ...oldUser,
          ...updatedUser,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(newUser)
        );
      }

      setEditing(false);

      toast.success(
        "Profile updated successfully!"
      );
    } catch (error) {
      console.error(
        "UPDATE PROFILE ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600 font-semibold">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // PROFILE NOT FOUND
  // =====================================================

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <FaUser className="text-5xl text-gray-400 mx-auto mb-4" />

          <h2 className="text-2xl font-bold text-gray-800">
            Profile Not Found
          </h2>

          <p className="text-gray-500 mt-2">
            Unable to load your profile information.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              My Profile
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your personal and fitness information
            </p>
          </div>

          {/* EDIT BUTTON */}

          {!editing && (
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md"
            >
              <FaEdit />
              Edit Profile
            </button>
          )}
        </div>

        {/* =================================================
            PROFILE CARD
        ================================================= */}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

          {/* =================================================
              COVER
          ================================================= */}

          <div className="h-32 bg-gradient-to-r from-red-600 to-red-800"></div>

          {/* =================================================
              PROFILE HEADER
          ================================================= */}

          <div className="px-6 md:px-10 pb-8">

            <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-12">

              {/* PROFILE IMAGE */}

              <div className="w-24 h-24 shrink-0 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">

                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display =
                        "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <FaUser className="text-4xl text-gray-700" />
                  </div>
                )}

              </div>

              {/* USER INFO */}

              <div className="pb-1 min-w-0">

                <h2 className="text-2xl font-bold text-gray-900 truncate">
                  {user.name || "User"}
                </h2>

                <p className="text-gray-500 truncate">
                  {user.email || "No email"}
                </p>

              </div>
            </div>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleUpdate}
            className="px-6 md:px-10 pb-10"
          >

            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div className="flex items-center gap-3 mb-7">

              <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                <FaUser className="text-red-600 text-lg" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Personal Information
                </h2>

                <p className="text-sm text-gray-500">
                  Your personal and fitness details
                </p>
              </div>

            </div>

            {/* =================================================
                FORM FIELDS
            ================================================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* NAME */}

              <InputField
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                icon={<FaUser />}
                editing={editing}
              />

              {/* EMAIL */}

              <InputField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                icon={<FaEnvelope />}
                editing={editing}
              />

              {/* PHONE */}

              <InputField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                icon={<FaPhone />}
                editing={editing}
              />

              {/* AGE */}

              <InputField
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                icon={<FaBirthdayCake />}
                editing={editing}
              />

              {/* GENDER */}

              <SelectField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                icon={<FaVenusMars />}
                editing={editing}
                options={[
                  {
                    value: "Male",
                    label: "Male",
                  },
                  {
                    value: "Female",
                    label: "Female",
                  },
                  {
                    value: "Other",
                    label: "Other",
                  },
                ]}
              />

              {/* HEIGHT */}

              <InputField
                label="Height (cm)"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                icon={<FaRulerVertical />}
                editing={editing}
              />

              {/* WEIGHT */}

              <InputField
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                icon={<FaWeight />}
                editing={editing}
              />

              {/* FITNESS GOAL */}

              <SelectField
                label="Fitness Goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                icon={<FaBullseye />}
                editing={editing}
                options={[
                  {
                    value: "Weight Loss",
                    label: "Weight Loss",
                  },
                  {
                    value: "Weight Gain",
                    label: "Weight Gain",
                  },
                  {
                    value: "Muscle Building",
                    label: "Muscle Building",
                  },
                  {
                    value: "General Fitness",
                    label: "General Fitness",
                  },
                ]}
              />

            </div>

            {/* =================================================
                ADDRESS
            ================================================= */}

            <div className="mt-6">

              <FieldLabel
                icon={<FaMapMarkerAlt />}
                label="Address"
              />

              {editing ? (
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter your address"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium placeholder:text-gray-400 outline-none resize-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              ) : (
                <div className="min-h-[52px] flex items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
                  {user.address || "Not provided"}
                </div>
              )}

            </div>

            {/* =================================================
                EDIT MODE BUTTONS
            ================================================= */}

            {editing && (
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-gray-200">

                {/* CANCEL */}

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 font-semibold transition disabled:opacity-50"
                >
                  <FaTimes />
                  Cancel
                </button>

                {/* UPDATE */}

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaSave />

                  {saving
                    ? "Updating..."
                    : "Update Profile"}
                </button>

              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FIELD LABEL
========================================================= */

function FieldLabel({ icon, label }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
      <span className="text-gray-800">
        {icon}
      </span>

      <span>{label}</span>
    </label>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  icon,
  editing,
}) {
  return (
    <div className="w-full">

      <FieldLabel
        icon={icon}
        label={label}
      />

      <div className="relative">

        {/* ICON */}

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10">
          {icon}
        </span>

        {/* INPUT */}

        <input
          type={type}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={!editing}
          className={`w-full h-12 pl-11 pr-4 rounded-xl border font-medium outline-none transition ${
            editing
              ? "bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "bg-gray-50 border-gray-200 text-gray-900 cursor-not-allowed"
          }`}
        />

      </div>
    </div>
  );
}

/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  label,
  name,
  value,
  onChange,
  icon,
  editing,
  options,
}) {
  return (
    <div className="w-full">

      <FieldLabel
        icon={icon}
        label={label}
      />

      <div className="relative">

        {/* ICON */}

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none">
          {icon}
        </span>

        {/* SELECT */}

        <select
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={!editing}
          className={`w-full h-12 pl-11 pr-4 rounded-xl border font-medium outline-none transition ${
            editing
              ? "bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-2 focus:ring-red-100 cursor-pointer"
              : "bg-gray-50 border-gray-200 text-gray-900 cursor-not-allowed"
          }`}
        >

          <option value="">
            Select {label}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}

        </select>

      </div>
    </div>
  );
}

export default Profile;