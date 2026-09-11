
import { useEffect, useState } from "react";
import api from "../../Service/api";
import { toast } from "react-toastify";

const initialProfile = {
  name: "",
  email: "",
  phone: "",
  address: "",
  age: "",
  gender: "",
  qualification: "",
  experience: "",
  specialization: "",
  bio: "",
  meetingLink: "",
  availableDays: "",
  availableTime: "",
  height: "",
  weight: "",
  goal: "",
  profileImage: "",
};

function TrainerProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const getUser = () => {
    try {
      return JSON.parse(
        localStorage.getItem("user") || "null"
      );
    } catch {
      return null;
    }
  };

  const getTrainerId = () => {
    const user = getUser();

    return (
      user?._id ||
      user?.id ||
      localStorage.getItem("trainerId") ||
      localStorage.getItem("userId")
    );
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const trainerId = getTrainerId();

      if (!trainerId) {
        toast.error(
          "Trainer login information not found"
        );
        return;
      }

      const response = await api.get(
        `/trainers/${trainerId}`
      );

      const trainer = response.data?.trainer;

      if (!trainer) {
        toast.error("Trainer profile not found");
        return;
      }

      setProfile({
        name: trainer.name || "",
        email: trainer.email || "",
        phone: trainer.phone || "",
        address: trainer.address || "",
        age: trainer.age || "",
        gender: trainer.gender || "",
        qualification: trainer.qualification || "",
        experience: trainer.experience || "",
        specialization: trainer.specialization || "",
        bio: trainer.bio || "",
        meetingLink: trainer.meetingLink || "",

        availableDays: Array.isArray(
          trainer.availableDays
        )
          ? trainer.availableDays.join(", ")
          : trainer.availableDays || "",

        availableTime:
          trainer.availableSlots?.[0]?.startTime || "",

        height: trainer.height || "",
        weight: trainer.weight || "",
        goal: trainer.goal || "",
        profileImage: trainer.profileImage || "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    try {
      setUploading(true);

      const trainerId = getTrainerId();

      if (!trainerId) {
        toast.error(
          "Trainer login information not found"
        );
        return;
      }

      const formData = new FormData();

      formData.append("profileImage", file);

      const response = await api.post(
        `/trainers/${trainerId}/profile-image`,
        formData
      );

      const imageUrl =
        response.data?.trainer?.profileImage;

      if (!imageUrl) {
        toast.error("Image upload failed");
        return;
      }

      setProfile((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));

      toast.success(
        "Profile image uploaded successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Image upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const trainerId = getTrainerId();

      if (!trainerId) {
        toast.error(
          "Trainer login information not found"
        );
        return;
      }

      const availableDaysArray = profile.availableDays
        .split(",")
        .map((day) => day.trim().toLowerCase())
        .filter(Boolean);

      const trainerData = {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        age: profile.age,
        gender: profile.gender,
        qualification: profile.qualification,
        experience: profile.experience,
        specialization: profile.specialization,
        bio: profile.bio,
        meetingLink: profile.meetingLink,

        availableDays: availableDaysArray,

        availableSlots: profile.availableTime
          ? [
              {
                day: availableDaysArray[0] || "",
                startTime: profile.availableTime,
                endTime: "",
              },
            ]
          : [],

        height: profile.height,
        weight: profile.weight,
        goal: profile.goal,
        profileImage: profile.profileImage,
      };

      const response = await api.put(
        `/trainers/${trainerId}`,
        trainerData
      );

      toast.success(
        response.data?.message ||
          "Profile updated successfully"
      );

      const updatedTrainer =
        response.data?.trainer;

      if (updatedTrainer) {
        setProfile({
          name: updatedTrainer.name || "",
          email: updatedTrainer.email || "",
          phone: updatedTrainer.phone || "",
          address: updatedTrainer.address || "",
          age: updatedTrainer.age || "",
          gender: updatedTrainer.gender || "",
          qualification:
            updatedTrainer.qualification || "",
          experience:
            updatedTrainer.experience || "",
          specialization:
            updatedTrainer.specialization || "",
          bio: updatedTrainer.bio || "",
          meetingLink:
            updatedTrainer.meetingLink || "",

          availableDays: Array.isArray(
            updatedTrainer.availableDays
          )
            ? updatedTrainer.availableDays.join(", ")
            : "",

          availableTime:
            updatedTrainer.availableSlots?.[0]
              ?.startTime || "",

          height: updatedTrainer.height || "",
          weight: updatedTrainer.weight || "",
          goal: updatedTrainer.goal || "",
          profileImage:
            updatedTrainer.profileImage || "",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Profile update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />

          <p className="text-gray-600 font-medium">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full min-h-11 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200";

  return (
    <main className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      {/* HEADER */}
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Trainer Profile
        </h1>

        <p className="text-gray-500">
          Manage your professional and personal information.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col gap-8"
      >
        {/* PROFILE PHOTO */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-800">
            Profile Photo
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Trainer Profile"
                className="w-28 h-28 object-cover rounded-full border-4 border-blue-500"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-semibold">
                No Photo
              </div>
            )}

            <div className="flex-1 w-full flex flex-col gap-2">
              <label
                htmlFor="profileImage"
                className="font-semibold text-gray-700"
              >
                Upload Profile Photo
              </label>

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={uploading}
                className="w-full border border-gray-300 rounded-lg min-h-11"
              />

              {uploading && (
                <span className="text-sm text-blue-600">
                  Uploading image...
                </span>
              )}
            </div>
          </div>
        </section>

        {/* PERSONAL INFORMATION */}
        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-gray-800">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              label="Full Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              inputClass={inputClass}
              required
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              inputClass={inputClass}
              required
            />

            <FormField
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              inputClass={inputClass}
            />

            <FormField
              label="Age"
              name="age"
              type="number"
              value={profile.age}
              onChange={handleChange}
              inputClass={inputClass}
            />

            <FormField
              label="Address"
              name="address"
              value={profile.address}
              onChange={handleChange}
              inputClass={inputClass}
            />

            <div className="flex flex-col gap-2">
              <label
                htmlFor="gender"
                className="font-semibold text-gray-700"
              >
                Gender
              </label>

              <select
                id="gender"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </section>

        {/* PROFESSIONAL INFORMATION */}
        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-gray-800">
            Professional Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              label="Qualification"
              name="qualification"
              value={profile.qualification}
              onChange={handleChange}
              inputClass={inputClass}
            />

            <FormField
              label="Experience (Years)"
              name="experience"
              type="number"
              value={profile.experience}
              onChange={handleChange}
              inputClass={inputClass}
            />

            <FormField
              label="Specialization"
              name="specialization"
              value={profile.specialization}
              onChange={handleChange}
              inputClass={inputClass}
            />

            <FormField
              label="Meeting Link"
              name="meetingLink"
              type="url"
              value={profile.meetingLink}
              onChange={handleChange}
              placeholder="https://zoom.us/..."
              inputClass={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="bio"
              className="font-semibold text-gray-700"
            >
              About Me
            </label>

            <textarea
              id="bio"
              name="bio"
              rows="5"
              value={profile.bio}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              placeholder="Tell students about your experience and training style"
            />
          </div>
        </section>

        {/* AVAILABILITY */}
        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-gray-800">
            Availability
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              label="Available Days"
              name="availableDays"
              value={profile.availableDays}
              onChange={handleChange}
              placeholder="monday, wednesday, friday"
              inputClass={inputClass}
            />

            <FormField
              label="Available Time"
              name="availableTime"
              type="text"
              value={profile.availableTime}
              onChange={handleChange}
              placeholder="Example: 8:00 PM"
              inputClass={inputClass}
            />
          </div>
        </section>

        {/* FITNESS INFORMATION */}
        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-gray-800">
            Fitness Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormField
              label="Height"
              name="height"
              value={profile.height}
              onChange={handleChange}
              placeholder="Example: 170 cm"
              inputClass={inputClass}
            />

            <FormField
              label="Weight"
              name="weight"
              value={profile.weight}
              onChange={handleChange}
              placeholder="Example: 65 kg"
              inputClass={inputClass}
            />

            <FormField
              label="Fitness Goal"
              name="goal"
              value={profile.goal}
              onChange={handleChange}
              placeholder="Example: Weight Loss"
              inputClass={inputClass}
            />
          </div>
        </section>

        {/* SAVE */}
        <button
          type="submit"
          disabled={saving}
          className="w-full min-h-12 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {saving ? "Saving Profile..." : "Save Profile"}
        </button>
      </form>
    </main>
  );
}

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  inputClass,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-semibold text-gray-700"
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
        required={required}
      />
    </div>
  );
}

export default TrainerProfile;