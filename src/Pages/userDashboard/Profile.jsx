import { useState } from "react";

function Profile() {
  const [user, setUser] = useState({
    name: "Kezia",
    email: "kezia@gmail.com",
    phone: "9876543210",
    age: "22",
    gender: "Female",
    height: "150 cm",
    weight: "54 kg",
    goal: "Weight Loss",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
    console.log(user);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 max-w-3xl"
      >
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Age</label>
            <input
              type="number"
              name="age"
              value={user.age}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Gender</label>
            <select
              name="gender"
              value={user.gender}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Height</label>
            <input
              type="text"
              name="height"
              value={user.height}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Weight</label>
            <input
              type="text"
              name="weight"
              value={user.weight}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Fitness Goal</label>
            <select
              name="goal"
              value={user.goal}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option>Weight Loss</option>
              <option>Muscle Gain</option>
              <option>General Fitness</option>
              <option>Strength Training</option>
            </select>
          </div>

        </div>

        <button
          type="submit"
          className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;