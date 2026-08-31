function DashboardCard({ title, value, color }) {
  return (
    <div className={`rounded-xl shadow-lg text-white ${color} m-0 p-0`}>
      <h3 className="text-lg m-0 p-0">{title}</h3>
      <h1 className="text-4xl font-bold m-0 p-0">
        {value}
      </h1>
    </div>
  );
}

export default DashboardCard;
