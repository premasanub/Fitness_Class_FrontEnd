import Sidebar from "../components/Sidebar";
import DashboardHome from "../components/DashboardHome";

function UserDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <DashboardHome />
    </div>
  );
}

export default UserDashboard;