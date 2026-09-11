

import { useEffect, useState } from "react";
import api from "../../Service/api";
import { toast } from "react-toastify";

function DashboardHome() {
  const [dashboard, setDashboard] = useState({
    totalBookings: 0,
    upcomingBookings: 0,
    completedBookings: 0,
    feedbackGiven: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem("user") || "null"
        );

        const userId = user?._id || user?.id;

        if (!userId) {
          toast.error("User not found");
          return;
        }

        const response = await api.get(
          `/user/dashboard/${userId}`
        );

        if (response.data?.success) {
          setDashboard({
            totalBookings:
              response.data.stats?.totalBookings ?? 0,
            upcomingBookings:
              response.data.stats?.upcomingBookings ?? 0,
            completedBookings:
              response.data.stats?.completedBookings ?? 0,
            feedbackGiven:
              response.data.stats?.feedbackGiven ?? 0,
          });
        } else {
          toast.error(
            response.data?.message ||
              "Failed to load dashboard"
          );
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Total Bookings",
      value: dashboard.totalBookings,
      className: "bg-blue-600",
    },
    {
      title: "Upcoming",
      value: dashboard.upcomingBookings,
      className: "bg-green-600",
    },
    {
      title: "Completed",
      value: dashboard.completedBookings,
      className: "bg-purple-600",
    },
    {
      title: "Feedback Given",
      value: dashboard.feedbackGiven,
      className: "bg-orange-500",
    },
  ];

  return (
    <main className="w-full flex flex-col gap-8">
      {/* HEADER */}
      <section className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome 👋
        </h1>

        <p className="text-gray-500">
          Track your fitness journey here.
        </p>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.className} text-white rounded-xl shadow-lg min-h-40 flex flex-col justify-center gap-3`}
          >
            <h2 className="text-lg font-semibold">
              {card.title}
            </h2>

            <p className="text-4xl font-bold">
              {loading ? "..." : card.value}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default DashboardHome;