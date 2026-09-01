import { useEffect, useState } from "react";
import api from "../../Service/api";
import { toast } from "react-toastify";

function TrainerProfile() {

  // =====================================================
  // STATE
  // =====================================================

  const [profile, setProfile] = useState({
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

    // UI input values are strings
    availableDays: "",
    availableTime: "",

    height: "",
    weight: "",
    goal: "",

    profileImage: "",
  });


  // =====================================================
  // FETCH TRAINER PROFILE
  // =====================================================

  useEffect(() => {
    fetchProfile();
  }, []);


  const fetchProfile = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user?._id) {
        toast.error("Trainer login information not found");
        return;
      }


      const response = await api.get(
        `/trainers/${user._id}`
      );


      const trainer = response.data.trainer;


      setProfile({

        name: trainer.name || "",

        email: trainer.email || "",

        phone: trainer.phone || "",

        address: trainer.address || "",

        age: trainer.age || "",

        gender: trainer.gender || "",


        qualification:
          trainer.qualification || "",

        experience:
          trainer.experience || "",

        specialization:
          trainer.specialization || "",

        bio:
          trainer.bio || "",


        meetingLink:
          trainer.meetingLink || "",


        // =========================================
        // ARRAY → STRING FOR INPUT
        // =========================================

        availableDays:
          Array.isArray(trainer.availableDays)
            ? trainer.availableDays.join(", ")
            : trainer.availableDays || "",


        availableTime:
          trainer.availableSlots?.[0]?.startTime || "",


        height:
          trainer.height || "",

        weight:
          trainer.weight || "",

        goal:
          trainer.goal || "",


        // =========================================
        // CLOUDINARY IMAGE URL
        // =========================================

        profileImage:
          trainer.profileImage || "",
      });


    } catch (error) {

      console.log(
        "Fetch Profile Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to load profile"
      );
    }
  };


  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // =====================================================
  // PROFILE IMAGE UPLOAD
  // =====================================================

  const handleImageChange = async (e) => {

    const file = e.target.files?.[0];

    if (!file) {
      return;
    }


    // Only image files
    if (!file.type.startsWith("image/")) {

      toast.error(
        "Please select an image file"
      );

      return;
    }


    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );


      if (!user?._id) {

        toast.error(
          "Trainer login information not found"
        );

        return;
      }


      // =========================================
      // FORM DATA
      // =========================================

      const formData = new FormData();

      formData.append(
        "profileImage",
        file
      );


      // =========================================
      // SEND IMAGE TO BACKEND
      // MULTER → CLOUDINARY
      // =========================================

      const response = await api.post(

        `/trainers/${user._id}/profile-image`,

        formData

      );


      // =========================================
      // GET CLOUDINARY URL FROM RESPONSE
      // =========================================

      const imageUrl =
        response.data.trainer.profileImage;


      // =========================================
      // UPDATE FRONTEND
      // =========================================

      setProfile((prev) => ({

        ...prev,

        profileImage: imageUrl,

      }));


      toast.success(
        "Profile image uploaded successfully"
      );


    } catch (error) {

      console.log(
        "Image Upload Error:",
        error
      );


      toast.error(

        error.response?.data?.message ||

        "Image upload failed"

      );
    }
  };


  // =====================================================
  // SAVE TRAINER PROFILE
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );


      if (!user?._id) {

        toast.error(
          "Trainer login information not found"
        );

        return;
      }


      // =========================================
      // AVAILABLE DAYS
      // STRING → ARRAY
      // =========================================

      const availableDaysArray =
        profile.availableDays
          .split(",")
          .map((day) => day.trim().toLowerCase())
          .filter((day) => day !== "");


      // =========================================
      // TRAINER DATA
      // =========================================

      const trainerData = {

        name: profile.name,

        email: profile.email,

        phone: profile.phone,

        address: profile.address,

        age: profile.age,

        gender: profile.gender,


        qualification:
          profile.qualification,

        experience:
          profile.experience,

        specialization:
          profile.specialization,

        bio:
          profile.bio,


        meetingLink:
          profile.meetingLink,


        // Array
        availableDays:
          availableDaysArray,


        // Array of objects
        availableSlots: [

          {

            day:
              availableDaysArray[0] || "",

            startTime:
              profile.availableTime,

            endTime: "",

          },

        ],


        height:
          profile.height,

        weight:
          profile.weight,

        goal:
          profile.goal,


        // Cloudinary URL
        profileImage:
          profile.profileImage,
      };


      // =========================================
      // UPDATE TRAINER
      // =========================================

      const response = await api.put(

        `/trainers/${user._id}`,

        trainerData

      );


      toast.success(
        response.data.message ||
        "Profile updated successfully"
      );


      // =========================================
      // UPDATE STATE FROM RESPONSE
      // =========================================

      const updatedTrainer =
        response.data.trainer;


      setProfile((prev) => ({

        ...prev,

        name:
          updatedTrainer.name || "",

        email:
          updatedTrainer.email || "",

        phone:
          updatedTrainer.phone || "",

        address:
          updatedTrainer.address || "",

        age:
          updatedTrainer.age || "",

        gender:
          updatedTrainer.gender || "",


        qualification:
          updatedTrainer.qualification || "",

        experience:
          updatedTrainer.experience || "",

        specialization:
          updatedTrainer.specialization || "",

        bio:
          updatedTrainer.bio || "",


        meetingLink:
          updatedTrainer.meetingLink || "",


        availableDays:
          Array.isArray(
            updatedTrainer.availableDays
          )
            ? updatedTrainer.availableDays.join(", ")
            : "",


        availableTime:
          updatedTrainer.availableSlots?.[0]
            ?.startTime || "",


        height:
          updatedTrainer.height || "",

        weight:
          updatedTrainer.weight || "",

        goal:
          updatedTrainer.goal || "",


        profileImage:
          updatedTrainer.profileImage || "",

      }));


    } catch (error) {

      console.log(
        "Update Profile Error:",
        error
      );


      toast.error(

        error.response?.data?.message ||

        "Profile update failed"

      );
    }
  };


  // =====================================================
  // JSX
  // =====================================================

  return (

    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-2 my-5">

      <h1 className="text-3xl font-bold mb-8">
        Trainer Profile
      </h1>


      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >


        {/* =================================================
            PROFILE IMAGE
        ================================================= */}

        <div>

          <label className="font-semibold">
            Profile Photo
          </label>


          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-3 rounded-lg mt-2"
          />


          {/* IMAGE PREVIEW */}

          {profile.profileImage && (

            <div className="mt-4">

              <img
                src={profile.profileImage}
                alt="Trainer Profile"
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-500"
              />

            </div>

          )}

        </div>


        {/* =================================================
            NAME
        ================================================= */}

        <div>

          <label className="font-semibold">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>


        {/* =================================================
            EMAIL
        ================================================= */}

        <div>

          <label className="font-semibold">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>


        {/* =================================================
            PHONE
        ================================================= */}

        <div>

          <label className="font-semibold">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>


        {/* =================================================
            ADDRESS
        ================================================= */}

        <div>

          <label className="font-semibold">
            Address
          </label>

          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>


        {/* =================================================
            AGE
        ================================================= */}

        <div>

          <label className="font-semibold">
            Age
          </label>

          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>


        {/* =================================================
            GENDER
        ================================================= */}

        <div>

          <label className="font-semibold">
            Gender
          </label>

          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          >

            <option value="">
              Select Gender
            </option>

            <option value="male">
              Male
            </option>

            <option value="female">
              Female
            </option>

            <option value="other">
              Other
            </option>

          </select>

        </div>


        {/* =================================================
            QUALIFICATION
        ================================================= */}

        <div>

          <label className="font-semibold">
            Qualification
          </label>

          <input
            type="text"
            name="qualification"
            value={profile.qualification}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>


        {/* =================================================
            EXPERIENCE
        ================================================= */}

        <div>

          <label className="font-semibold">
            Experience
          </label>

          <input
            type="number"
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>


        {/* =================================================
            SPECIALIZATION
        ================================================= */}

        <div>

          <label className="font-semibold">
            Specialization
          </label>

          <input
            type="text"
            name="specialization"
            value={profile.specialization}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>


        {/* =================================================
            BIO
        ================================================= */}

        <div>

          <label className="font-semibold">
            About Me
          </label>

          <textarea
            name="bio"
            rows="4"
            value={profile.bio}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>


        {/* =================================================
            AVAILABLE DAYS
        ================================================= */}

        <div>

          <label className="font-semibold">
            Available Days
          </label>

          <input
            type="text"
            name="availableDays"
            value={profile.availableDays}
            onChange={handleChange}
            placeholder="Example: monday, wednesday, friday"
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>


        {/* =================================================
            AVAILABLE TIME
        ================================================= */}

        <div>

          <label className="font-semibold">
            Available Time
          </label>

          <input
            type="text"
            name="availableTime"
            value={profile.availableTime}
            onChange={handleChange}
            placeholder="Example: 8:00 PM"
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>


        {/* =================================================
            MEETING LINK
        ================================================= */}

        <div>

          <label className="font-semibold">
            Meeting Link
          </label>

          <input
            type="text"
            name="meetingLink"
            value={profile.meetingLink}
            onChange={handleChange}
            placeholder="https://zoom.us/..."
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>


        {/* =================================================
            HEIGHT
        ================================================= */}

        <div>

          <label className="font-semibold">
            Height
          </label>

          <input
            type="text"
            name="height"
            value={profile.height}
            onChange={handleChange}
            placeholder="Example: 170 cm"
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>


        {/* =================================================
            WEIGHT
        ================================================= */}

        <div>

          <label className="font-semibold">
            Weight
          </label>

          <input
            type="text"
            name="weight"
            value={profile.weight}
            onChange={handleChange}
            placeholder="Example: 65 kg"
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>


        {/* =================================================
            GOAL
        ================================================= */}

        <div>

          <label className="font-semibold">
            Fitness Goal
          </label>

          <input
            type="text"
            name="goal"
            value={profile.goal}
            onChange={handleChange}
            placeholder="Example: Weight Loss"
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>


        {/* =================================================
            SAVE BUTTON
        ================================================= */}

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Save Profile
        </button>


      </form>

    </div>

  );
}

export default TrainerProfile;