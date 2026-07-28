function TrainerBookings() {

  const bookings = [
    {
      id: 1,
      student: "John",
      class: "Yoga",
      date: "28 Jul 2026",
      time: "7:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      student: "Emma",
      class: "Zumba",
      date: "29 Jul 2026",
      time: "6:00 PM",
      status: "Pending",
    },
    {
      id: 3,
      student: "David",
      class: "Strength",
      date: "30 Jul 2026",
      time: "8:00 AM",
      status: "Confirmed",
    },
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        My Bookings
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-3">Student</th>
              <th>Class</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {bookings.map((item) => (

              <tr
                key={item.id}
                className="border-b text-center hover:bg-gray-100"
              >
                <td className="p-3">{item.student}</td>
                <td>{item.class}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      item.status === "Confirmed"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TrainerBookings;