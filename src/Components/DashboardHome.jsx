// import { useEffect, useState } from "react";
// import DashboardCard from "./DashboardCard";
// import api from "../../Service/api";
// import { toast } from "react-toastify";

// function DashboardHome() {

//   const [stats, setStats] = useState({
//     totalBookings: 0,
//     upcomingBookings: 0,
//     completedBookings: 0,
//     feedbackGiven: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {

//       const user = JSON.parse(localStorage.getItem("user"));

//       if (!user?._id) {
//         console.log("User not found in localStorage");
//         return;
//       }

//       const response = await api.get(
//         `/bookings/dashboard/${user._id}`
//       );

//       setStats(response.data.stats);

//     } catch (error) {

//       console.error("Dashboard Error:", error);

//       toast.error(
//         error.response?.data?.message ||
//         "Failed to load dashboard"
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (

//     <div className="flex-1 p-8 bg-gray-100 min-h-screen ">

//       <h1 className="text-4xl font-bold">
//         Welcome Back 👋
//       </h1>

//       <p className="text-gray-600 mt-2">
//         Here's your fitness summary.
//       </p>

//       <div className="grid md:grid-cols-4 gap-6 mt-10">

//         <DashboardCard
//           title="Total Bookings"
//           value={loading ? "..." : stats.totalBookings}
//           color="bg-blue-600"
//         />

//         <DashboardCard
//           title="Upcoming"
//           value={loading ? "..." : stats.upcomingBookings}
//           color="bg-green-600"
//         />

//         <DashboardCard
//           title="Completed"
//           value={loading ? "..." : stats.completedBookings}
//           color="bg-purple-600"
//         />

//         <DashboardCard
//           title="Feedback Given"
//           value={loading ? "..." : stats.feedbackGiven}
//           color="bg-orange-500"
//         />

//       </div>

//     </div>

//   );
// }

// export default DashboardHome;

import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import api from "../../Service/api";
import { toast } from "react-toastify";

function DashboardHome() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingBookings: 0,
    completedBookings: 0,
    feedbackGiven: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        toast.error("Please login to view your dashboard");
        return;
      }

      const user = JSON.parse(storedUser);

      if (!user?._id) {
        toast.error("Unable to load user information");
        return;
      }

      const response = await api.get(
        `/bookings/dashboard/${user._id}`
      );

      const dashboardStats = response.data?.stats;

      setStats({
        totalBookings: dashboardStats?.totalBookings ?? 0,
        upcomingBookings:
          dashboardStats?.upcomingBookings ?? 0,
        completedBookings:
          dashboardStats?.completedBookings ?? 0,
        feedbackGiven:
          dashboardStats?.feedbackGiven ?? 0,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 bg-gray-100 min-h-screen flex flex-col gap-8">

      {/* Header */}
      <section className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>

        <p className="text-gray-600">
          Here's your fitness summary.
        </p>
      </section>

      {/* Dashboard Statistics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <DashboardCard
          title="Total Bookings"
          value={
            loading
              ? "..."
              : stats.totalBookings
          }
          color="bg-blue-600"
        />

        <DashboardCard
          title="Upcoming"
          value={
            loading
              ? "..."
              : stats.upcomingBookings
          }
          color="bg-green-600"
        />

        <DashboardCard
          title="Completed"
          value={
            loading
              ? "..."
              : stats.completedBookings
          }
          color="bg-purple-600"
        />

        <DashboardCard
          title="Feedback Given"
          value={
            loading
              ? "..."
              : stats.feedbackGiven
          }
          color="bg-orange-500"
        />

      </section>
    </main>
  );
}

export default DashboardHome;

