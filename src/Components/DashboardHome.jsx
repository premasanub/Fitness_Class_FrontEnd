import DashboardCard from "./DashboardCard";

function DashboardHome() {

  return (

    <div className="flex-1 p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold">
        Welcome, Kezia 👋
      </h1>

      <p className="text-gray-600 mt-2">
        Here's your fitness summary.
      </p>

      <div className="grid md:grid-cols-4 gap-6 mt-10">

        <DashboardCard
          title="Total Bookings"
          value="12"
          color="bg-blue-600"
        />

        <DashboardCard
          title="Upcoming"
          value="3"
          color="bg-green-600"
        />

        <DashboardCard
          title="Completed"
          value="9"
          color="bg-purple-600"
        />

        <DashboardCard
          title="Feedback Given"
          value="8"
          color="bg-orange-500"
        />

      </div>

    </div>

  );
}

export default DashboardHome;