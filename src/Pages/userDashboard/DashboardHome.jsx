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
    <main className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
              Dashboard
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Welcome 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Track your fitness journey and manage your
              bookings from here.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
            {cards.map((card) => (
              <div
                key={card.title}
                className={`${card.className} text-white rounded-2xl shadow-lg p-6 min-h-40 flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-base font-semibold">
                    {card.title}
                  </h2>

                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm font-bold">
                      #
                    </span>
                  </div>
                </div>

                <p className="text-4xl font-bold">
                  {loading ? "..." : card.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default DashboardHome;