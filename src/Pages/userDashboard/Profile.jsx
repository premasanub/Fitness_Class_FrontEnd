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

  // ==========================================
  // GET LOGGED-IN USER PROFILE
  // ==========================================
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/user/profile");

      const userData = response.data.user;

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

  // ==========================================
  // HANDLE INPUT
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // UPDATE PROFILE
  // ==========================================
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await api.put(
        "/user/profile",
        formData
      );

      const updatedUser = response.data.user;

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

      // Update localStorage
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...parsedUser,
            ...updatedUser,
          })
        );
      }

      setEditing(false);

      toast.success("Profile updated successfully");
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

  // ==========================================
  // CANCEL EDIT
  // ==========================================
  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      age: user?.age ?? "",
      gender: user?.gender || "",
      height: user?.height ?? "",
      weight: user?.weight ?? "",
      goal: user?.goal || "",
      address: user?.address || "",
    });

    setEditing(false);
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600 font-medium">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PROFILE NOT FOUND
  // ==========================================
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <FaUser className="text-5xl text-gray-400 mx-auto mb-4" />

          <h2 className="text-xl font-bold text-gray-800">
            Profile Not Found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* ==========================================
            PAGE HEADER
        ========================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Profile
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your personal information
            </p>
          </div>

          {!editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition"
            >
              <FaEdit />
              Edit Profile
            </button>
          )}
        </div>

        {/* ==========================================
            PROFILE CARD
        ========================================== */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          {/* RED COVER */}

          <div className="h-28 bg-gradient-to-r from-red-600 to-red-800"></div>

          {/* PROFILE HEADER */}

          <div className="px-6 md:px-10 pb-6">

            <div className="flex items-end gap-5 -mt-12">

              {/* PROFILE IMAGE */}

              <div className="w-24 h-24 shrink-0 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">

                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <FaUser className="text-4xl text-black" />
                  </div>
                )}

              </div>

              {/* USER NAME */}

              <div className="pb-1 min-w-0">

                <h2 className="text-2xl font-bold text-gray-900 truncate">
                  {user.name || "User"}
                </h2>

                <p className="text-gray-500 truncate">
                  {user.email}
                </p>

              </div>

            </div>
          </div>

          {/* ==========================================
              FORM
          ========================================== */}

          <form
            onSubmit={handleUpdate}
            className="px-6 md:px-10 pb-10"
          >

            {/* SECTION TITLE */}

            <div className="flex items-center gap-3 mb-7">

              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <FaUser className="text-red-600" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Personal Information
                </h2>

                <p className="text-sm text-gray-500">
                  Update your personal and fitness details
                </p>
              </div>

            </div>

            {/* ==========================================
                FIELDS
            ========================================== */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

              <InputField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                icon={<FaUser />}
                editing={editing}
              />

              <InputField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                icon={<FaEnvelope />}
                editing={editing}
              />

              <InputField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                icon={<FaPhone />}
                editing={editing}
              />

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
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
              />

              <InputField
                label="Height (cm)"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                icon={<FaRulerVertical />}
                editing={editing}
              />

              <InputField
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                icon={<FaWeight />}
                editing={editing}
              />

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

            {/* ==========================================
                ADDRESS
            ========================================== */}

            <div className="mt-5">

              <FieldLabel
                icon={<FaMapMarkerAlt />}
                label="Address"
              />

              {editing ? (
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter your address"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 outline-none resize-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              ) : (
                <div className="min-h-[48px] flex items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900">
                  {user.address || "Not provided"}
                </div>
              )}

            </div>

            {/* ==========================================
                BUTTONS
            ========================================== */}

            {editing && (
              <div className="flex justify-end items-center gap-3 mt-8 pt-6 border-t border-gray-200">

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 font-semibold transition"
                >
                  <FaTimes />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
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

/* =====================================================
   FIELD LABEL
===================================================== */

function FieldLabel({ icon, label }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
      <span className="text-black text-sm">
        {icon}
      </span>

      <span>{label}</span>
    </label>
  );
}

/* =====================================================
   INPUT FIELD
===================================================== */

function InputField({
  label,
  name,
  value,
  onChange,
  icon,
  type = "text",
  editing,
}) {
  return (
    <div className="w-full">

      <FieldLabel
        icon={icon}
        label={label}
      />

      {editing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full h-12 px-4 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />
      ) : (
        <div className="w-full min-h-[48px] flex items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
          {value || "Not provided"}
        </div>
      )}

    </div>
  );
}

/* =====================================================
   SELECT FIELD
===================================================== */

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

      {editing ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full h-12 px-4 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100 cursor-pointer"
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
      ) : (
        <div className="w-full min-h-[48px] flex items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
          {value || "Not provided"}
        </div>
      )}

    </div>
  );
}

export default Profile;