import { useState } from "react";

function TrainerProfile() {

  const [profile, setProfile] = useState({

    name: "Sarah Williams",

    email: "sarah@gmail.com",

    phone: "9876543210",

    qualification: "ACE Certified Fitness Trainer",

    experience: "8 Years",

    specialization: "Yoga",

    about:
      "I help clients achieve their fitness goals through interactive online fitness classes.",

    days: "Monday, Wednesday, Friday",

    time: "7:00 AM - 8:00 AM",

  });

  const handleChange = (e) => {

    setProfile({

      ...profile,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    alert("Profile Saved Successfully");

    console.log(profile);

  };

  return (

    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-8">

        Trainer Profile

      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Profile Image */}

        <div>

          <label className="font-semibold">

            Profile Photo

          </label>

          <input
            type="file"
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>

        <div>

          <label>Full Name</label>

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>

        <div>

          <label>Email</label>

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>

        <div>

          <label>Phone</label>

          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>

        <div>

          <label>Qualification</label>

          <input
            type="text"
            name="qualification"
            value={profile.qualification}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>

        <div>

          <label>Experience</label>

          <input
            type="text"
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>

        <div>

          <label>Specialization</label>

          <input
            type="text"
            name="specialization"
            value={profile.specialization}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>

        <div>

          <label>About Me</label>

          <textarea
            name="about"
            rows="4"
            value={profile.about}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>

        <div>

          <label>Available Days</label>

          <input
            type="text"
            name="days"
            value={profile.days}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>

        <div>

          <label>Available Time</label>

          <input
            type="text"
            name="time"
            value={profile.time}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mt-2"
          />

        </div>

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