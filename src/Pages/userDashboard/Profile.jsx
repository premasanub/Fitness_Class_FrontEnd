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

  // ===============================
  // GET LOGGED-IN USER PROFILE
  // ===============================
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
        age: userData.age || "",
        gender: userData.gender || "",
        height: userData.height || "",
        weight: userData.weight || "",
        goal: userData.goal || "",
        address: userData.address || "",
      });
    } catch (error) {
      console.log(
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

  // ===============================
  // INPUT CHANGE
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===============================
  // UPDATE PROFILE
  // ===============================
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
        age: updatedUser.age || "",
        gender: updatedUser.gender || "",
        height: updatedUser.height || "",
        weight: updatedUser.weight || "",
        goal: updatedUser.goal || "",
        address: updatedUser.address || "",
      });

      // Update localStorage user data
      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (storedUser) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...storedUser,
            ...updatedUser,
          })
        );
      }

      setEditing(false);

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(
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

  // ===============================
  // CANCEL EDIT
  // ===============================
  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      age: user?.age || "",
      gender: user?.gender || "",
      height: user?.height || "",
      weight: user?.weight || "",
      goal: user?.goal || "",
      address: user?.address || "",
    });

    setEditing(false);
  };

  // ===============================
  // LOADING
  // ===============================
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

  // ===============================
  // USER NOT FOUND
  // ===============================
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

  // ===============================
  // UI
  // ===============================
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      <div className="max-w-5xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

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
              onClick={() => setEditing(true)}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition"
            >
              <FaEdit />
              Edit Profile
            </button>
          )}

        </div>


        {/* ================= PROFILE CARD ================= */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* RED COVER */}

          <div className="h-28 bg-gradient-to-r from-red-600 to-red-800"></div>


          {/* PROFILE HEADER */}

          <div className="px-6 md:px-10 pb-6">

            <div className="flex items-center gap-5 -mt-12">

              <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">

                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                    <FaUser className="text-4xl text-gray-400" />
                  </div>
                )}

              </div>


              <div className="pt-10">

                <h2 className="text-2xl font-bold text-gray-900">
                  {user.name || "User"}
                </h2>

                <p className="text-gray-500">
                  {user.email}
                </p>

              </div>

            </div>

          </div>


          {/* ================= FORM ================= */}

          <form
            onSubmit={handleUpdate}
            className="p-6 md:p-10"
          >

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


            {/* ================= FIELDS ================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender
                </label>

                {editing ? (
                  <div className="relative">

                    <FaVenusMars className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >

                      <option value="">
                        Select Gender
                      </option>

                      <option value="Male">
                        Male
                      </option>

                      <option value="Female">
                        Female
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                  </div>
                ) : (
                  <DisplayField
                    icon={<FaVenusMars />}
                    value={user.gender}
                  />
                )}

              </div>


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


              {/* FITNESS GOAL */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fitness Goal
                </label>

                {editing ? (
                  <div className="relative">

                    <FaBullseye className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <select
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >

                      <option value="">
                        Select Goal
                      </option>

                      <option value="Weight Loss">
                        Weight Loss
                      </option>

                      <option value="Weight Gain">
                        Weight Gain
                      </option>

                      <option value="Muscle Building">
                        Muscle Building
                      </option>

                      <option value="General Fitness">
                        General Fitness
                      </option>

                    </select>

                  </div>
                ) : (
                  <DisplayField
                    icon={<FaBullseye />}
                    value={user.goal}
                  />
                )}

              </div>

            </div>


            {/* ================= ADDRESS ================= */}

            <div className="mt-6">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>

              {editing ? (
                <div className="relative">

                  <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter your address"
                    className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  />

                </div>
              ) : (
                <DisplayField
                  icon={<FaMapMarkerAlt />}
                  value={user.address}
                />
              )}

            </div>


            {/* ================= BUTTONS ================= */}

            {editing && (
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t">

                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold"
                >
                  <FaTimes />
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold disabled:opacity-50"
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
    <div>

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      {editing ? (
        <div className="relative">

          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>

          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

        </div>
      ) : (
        <DisplayField
          icon={icon}
          value={value}
        />
      )}

    </div>
  );
}


/* =====================================================
   DISPLAY FIELD
===================================================== */

function DisplayField({ icon, value }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">

      <div className="text-red-500">
        {icon}
      </div>

      <p className="text-gray-800 font-medium">
        {value || "Not provided"}
      </p>

    </div>
  );
}

export default Profile;