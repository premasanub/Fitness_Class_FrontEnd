function DashboardHome() {
  return (
    <div>

      <h1 className="text-4xl font-bold">
        Welcome 👋
      </h1>

      <p className="text-gray-500 mt-2">
        Track your fitness journey here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
          <h2>Total Bookings</h2>
          <h1 className="text-4xl font-bold mt-3">12</h1>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow">
          <h2>Upcoming</h2>
          <h1 className="text-4xl font-bold mt-3">3</h1>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-xl shadow">
          <h2>Completed</h2>
          <h1 className="text-4xl font-bold mt-3">9</h1>
        </div>

        <div className="bg-orange-500 text-white p-6 rounded-xl shadow">
          <h2>Feedback Given</h2>
          <h1 className="text-4xl font-bold mt-3">7</h1>
        </div>

      </div>

    </div>
  );
}

export default DashboardHome;