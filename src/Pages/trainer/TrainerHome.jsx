import {
  FaUsers,
  FaBookOpen,
  FaCalendarAlt,
  FaStar
} from "react-icons/fa";

function TrainerHome() {

  const todayClasses = [
    {
      id: 1,
      className: "Morning Yoga",
      time: "7:00 AM - 8:00 AM",
      students: 12,
      status: "Upcoming",
    },
    {
      id: 2,
      className: "Evening Cardio",
      time: "6:00 PM - 7:00 PM",
      students: 15,
      status: "Upcoming",
    },
  ];

  return (
    <div>

      <h1 className="text-4xl font-bold">
        Welcome Back, Sarah 👋
      </h1>

      <p className="text-gray-600 mt-2">
        Manage your online fitness classes efficiently.
      </p>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

        <div className="bg-white rounded-xl shadow p-6">
          <FaUsers className="text-3xl text-blue-600 mb-4"/>
          <h2 className="text-lg font-semibold">
            Total Students
          </h2>
          <p className="text-3xl font-bold mt-2">
            120
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaBookOpen className="text-3xl text-green-600 mb-4"/>
          <h2 className="text-lg font-semibold">
            Classes
          </h2>
          <p className="text-3xl font-bold mt-2">
            8
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaCalendarAlt className="text-3xl text-purple-600 mb-4"/>
          <h2 className="text-lg font-semibold">
            Today's Sessions
          </h2>
          <p className="text-3xl font-bold mt-2">
            3
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaStar className="text-3xl text-yellow-500 mb-4"/>
          <h2 className="text-lg font-semibold">
            Rating
          </h2>
          <p className="text-3xl font-bold mt-2">
            4.9
          </p>
        </div>

      </div>

      {/* Today's Schedule */}

      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-6">
          Today's Schedule
        </h2>

        <div className="space-y-5">

          {todayClasses.map((item) => (

            <div
              key={item.id}
              className="bg-white shadow rounded-xl p-6"
            >

              <h3 className="text-xl font-bold">
                {item.className}
              </h3>

              <p className="mt-2">
                Time : {item.time}
              </p>

              <p>
                Students : {item.students}
              </p>

              <p className="text-green-600 font-semibold">
                Status : {item.status}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default TrainerHome;