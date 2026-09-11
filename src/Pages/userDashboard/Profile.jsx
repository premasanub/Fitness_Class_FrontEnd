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

const getFormData = (userData) => ({
  name: userData?.name || "",
  email: userData?.email || "",
  phone: userData?.phone || "",
  age: userData?.age ?? "",
  gender: userData?.gender || "",
  height: userData?.height ?? "",
  weight: userData?.weight ?? "",
  goal: userData?.goal || "",
  address: userData?.address || "",
});

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await api.get("/user/profile");

        const userData =
          response.data?.user || response.data;

        if (!userData) {
          toast.error("Profile not found");
          return;
        }

        setUser(userData);
        setFormData(getFormData(userData));
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    if (!user) return;

    setFormData(getFormData(user));
    setEditing(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await api.put(
        "/user/profile",
        formData
      );

      const updatedUser =
        response.data?.user || response.data;

      if (!updatedUser) {
        toast.error("Failed to update profile");
        return;
      }

      setUser(updatedUser);
      setFormData(getFormData(updatedUser));

      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          const oldUser = JSON.parse(storedUser);

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...oldUser,
              ...updatedUser,
            })
          );
        } catch {
          localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
          );
        }
      }

      setEditing(false);

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>

          <p className="text-gray-600 font-semibold">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg text-center min-h-64 flex flex-col items-center justify-center gap-4">
          <FaUser className="text-5xl text-gray-400" />

          <h2 className="text-2xl font-bold text-gray-800">
            Profile Not Found
          </h2>

          <p className="text-gray-500">
            Unable to load your profile information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              My Profile
            </h1>

            <p className="text-gray-500">
              Manage your personal and fitness information
            </p>
          </div>

          {!editing && (
            <button
              type="button"
              onClick={handleEdit}
              className="min-h-11 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition shadow-md"
            >
              <FaEdit />
              Edit Profile
            </button>
          )}
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* COVER */}
          <div className="h-32 bg-gradient-to-r from-red-600 to-red-800"></div>

          {/* PROFILE HEADER */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-12">
              <div className="w-24 h-24 shrink-0 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
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
                    <FaUser className="text-4xl text-gray-700" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-gray-900 truncate">
                  {user.name || "User"}
                </h2>

                <p className="text-gray-500 truncate">
                  {user.email || "No email"}
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleUpdate}
            className="flex flex-col gap-7"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-red-50 flex items-center justify-center">
                <FaUser className="text-red-600 text-lg" />
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-gray-900">
                  Personal Information
                </h2>

                <p className="text-sm text-gray-500">
                  Your personal and fitness details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                name="name"
                type="text"
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

            {/* ADDRESS */}
            <div className="flex flex-col gap-2">
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
                  className="w-full border border-gray-300 rounded-xl text-gray-900 font-medium outline-none resize-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              ) : (
                <div className="min-h-14 flex items-center bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
                  {user.address || "Not provided"}
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            {editing && (
              <div className="flex flex-col sm:flex-row justify-end gap-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="min-h-11 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 font-semibold transition disabled:opacity-50"
                >
                  <FaTimes />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="min-h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaSave />

                  {saving ? "Updating..." : "Update Profile"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

function FieldLabel({ icon, label }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
      <span className="text-gray-800">{icon}</span>
      <span>{label}</span>
    </label>
  );
}

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
    <div className="w-full flex flex-col gap-2">
      <FieldLabel icon={icon} label={label} />

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10">
          {icon}
        </span>

        <input
          type={type}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={!editing}
          className={`w-full h-12 rounded-xl border font-medium outline-none transition indent-10 ${
            editing
              ? "bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "bg-gray-50 border-gray-200 text-gray-900 cursor-not-allowed"
          }`}
        />
      </div>
    </div>
  );
}

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
    <div className="w-full flex flex-col gap-2">
      <FieldLabel icon={icon} label={label} />

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none">
          {icon}
        </span>

        <select
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={!editing}
          className={`w-full h-12 rounded-xl border font-medium outline-none transition indent-10 ${
            editing
              ? "bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-2 focus:ring-red-100 cursor-pointer"
              : "bg-gray-50 border-gray-200 text-gray-900 cursor-not-allowed"
          }`}
        >
          <option value="">Select {label}</option>

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