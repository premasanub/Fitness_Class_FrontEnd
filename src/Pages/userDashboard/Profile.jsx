import { useEffect, useState } from "react";
import api from "../../Service/api";
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
  FaDumbbell,
} from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser?._id) {
        setLoading(false);
        return;
      }

      const response = await api.get(`/user/${storedUser._id}`);

      setUser(response.data.user || response.data);
    } catch (error) {
      console.log(
        "PROFILE ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600 font-medium">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <FaUser className="text-5xl text-gray-400 mx-auto mb-4" />

          <h2 className="text-xl font-bold text-gray-800">
            Profile Not Found
          </h2>

          <p className="text-gray-500 mt-2">
            Unable to load your profile details.
          </p>
        </div>
      </div>
    );
  }

  const profileImage = user.profileImage
    ? user.profileImage
    : null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto mb-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              My Profile
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your personal and fitness information
            </p>
          </div>

          <button
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            <FaEdit />
            Edit Profile
          </button>

        </div>
      </div>


      {/* ================= MAIN PROFILE ================= */}
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* ================= PROFILE COVER ================= */}
          <div className="h-32 bg-gradient-to-r from-red-600 to-red-800"></div>


          {/* ================= PROFILE HEADER ================= */}
          <div className="px-6 md:px-10 pb-8">

            <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-14">

              {/* Profile Image */}
              <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center overflow-hidden">

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-5xl text-gray-400" />
                )}

              </div>


              {/* Name */}
              <div className="pb-2">

                <h2 className="text-2xl font-bold text-gray-900">
                  {user.name || "User"}
                </h2>

                <p className="text-gray-500 mt-1">
                  {user.email || "No email available"}
                </p>

              </div>


              {/* Role */}
              <div className="md:ml-auto pb-2">

                <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full font-semibold capitalize">
                  <FaDumbbell />
                  {user.role || "User"}
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ================= PERSONAL INFORMATION ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mt-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <FaUser className="text-red-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Personal Information
              </h2>

              <p className="text-sm text-gray-500">
                Your basic personal details
              </p>
            </div>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Name */}
            <ProfileItem
              icon={<FaUser />}
              label="Full Name"
              value={user.name}
            />

            {/* Email */}
            <ProfileItem
              icon={<FaEnvelope />}
              label="Email Address"
              value={user.email}
            />

            {/* Phone */}
            <ProfileItem
              icon={<FaPhone />}
              label="Phone Number"
              value={user.phone}
            />

            {/* Age */}
            <ProfileItem
              icon={<FaBirthdayCake />}
              label="Age"
              value={user.age ? `${user.age} years` : null}
            />

            {/* Gender */}
            <ProfileItem
              icon={<FaVenusMars />}
              label="Gender"
              value={user.gender}
            />

            {/* Address */}
            <ProfileItem
              icon={<FaMapMarkerAlt />}
              label="Address"
              value={user.address}
            />

          </div>

        </div>


        {/* ================= FITNESS INFORMATION ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mt-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <FaDumbbell className="text-red-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Fitness Information
              </h2>

              <p className="text-sm text-gray-500">
                Your fitness and body information
              </p>
            </div>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

            {/* Height */}
            <ProfileItem
              icon={<FaRulerVertical />}
              label="Height"
              value={user.height ? `${user.height} cm` : null}
            />

            {/* Weight */}
            <ProfileItem
              icon={<FaWeight />}
              label="Weight"
              value={user.weight ? `${user.weight} kg` : null}
            />

            {/* Goal */}
            <ProfileItem
              icon={<FaBullseye />}
              label="Fitness Goal"
              value={user.goal}
            />

          </div>

        </div>


        {/* ================= ACCOUNT INFORMATION ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mt-6 mb-8">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <FaEnvelope className="text-red-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Account Information
              </h2>

              <p className="text-sm text-gray-500">
                Information about your account
              </p>
            </div>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <ProfileItem
              icon={<FaUser />}
              label="Account Role"
              value={user.role || "User"}
            />

            <ProfileItem
              icon={<FaEnvelope />}
              label="Account Email"
              value={user.email}
            />

          </div>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   PROFILE ITEM COMPONENT
===================================================== */

function ProfileItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl p-4">

      <div className="w-11 h-11 flex-shrink-0 rounded-lg bg-white shadow-sm flex items-center justify-center text-red-600">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-sm text-gray-500">
          {label}
        </p>

        <p className="font-semibold text-gray-900 mt-1 break-words">
          {value || "Not provided"}
        </p>

      </div>

    </div>
  );
}

export default Profile;