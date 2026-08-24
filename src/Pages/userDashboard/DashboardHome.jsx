import { useEffect, useState } from "react";
import { FaCalendarCheck, FaClock, FaCheckCircle, FaCommentDots } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../Service/api";

function DashboardHome() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingBookings: 0,
    completedBookings: 0,
    feedbackGiven: 0,
  });

  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH DASHBOARD DATA
  // ==========================================
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        toast.error("User not logged in");
        return;
      }

      const user = JSON.parse(storedUser);

      if (!user?._id) {
        toast.error("User ID not found");
        return;
      }

      console.log("Dashboard User ID:", user._id);

      const response = await api.get(
        `/user/dashboard/${user._id}`
      );

      console.log(
        "DASHBOARD API RESPONSE:",
        response.data
      );

      if (response.data.success) {
        setStats({
          totalBookings:
            response.data.stats?.totalBookings || 0,

          upcomingBookings:
            response.data.stats?.upcomingBookings || 0,

          completedBookings:
            response.data.stats?.completedBookings || 0,

          feedbackGiven:
            response.data.stats?.feedbackGiven || 0,
        });
      }

    } catch (error) {
      console.error(
        "DASHBOARD ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">

          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-500">
            Loading dashboard...
          </p>

        </div>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================
  return (
    <div>

      {/* HEADER */}

      <h1 className="text-4xl font-bold">
        Welcome 👋
      </h1>

      <p className="text-gray-500 mt-2">
        Track your fitness journey here.
      </p>


      {/* ==========================================
          STATISTICS
      ========================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

        {/* TOTAL BOOKINGS */}

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg">
                Total Bookings
              </h2>

              <h1 className="text-4xl font-bold mt-3">
                {stats.totalBookings}
              </h1>
            </div>

            <FaCalendarCheck className="text-4xl opacity-80" />

          </div>

        </div>


        {/* UPCOMING */}

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg">
                Upcoming
              </h2>

              <h1 className="text-4xl font-bold mt-3">
                {stats.upcomingBookings}
              </h1>
            </div>

            <FaClock className="text-4xl opacity-80" />

          </div>

        </div>


        {/* COMPLETED */}

        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg">
                Completed
              </h2>

              <h1 className="text-4xl font-bold mt-3">
                {stats.completedBookings}
              </h1>
            </div>

            <FaCheckCircle className="text-4xl opacity-80" />

          </div>

        </div>


        {/* FEEDBACK */}

        <div className="bg-orange-500 text-white p-6 rounded-xl shadow-lg">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg">
                Feedback Given
              </h2>

              <h1 className="text-4xl font-bold mt-3">
                {stats.feedbackGiven}
              </h1>
            </div>

            <FaCommentDots className="text-4xl opacity-80" />

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardHome;