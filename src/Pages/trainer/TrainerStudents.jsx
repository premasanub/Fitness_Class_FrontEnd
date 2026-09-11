


import { useEffect, useState } from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBookOpen,
} from "react-icons/fa";
import api from "../../Service/api";

const getStoredUser = () => {
  const keys = ["user", "trainer", "userData"];

  for (const key of keys) {
    try {
      const value = localStorage.getItem(key);

      if (value) {
        const parsed = JSON.parse(value);

        if (parsed) {
          return parsed;
        }
      }
    } catch {
      // Ignore invalid localStorage data
    }
  }

  return null;
};

function TrainerStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUser = getStoredUser();

  const trainerId =
    storedUser?._id ||
    storedUser?.id ||
    localStorage.getItem("userId");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");

        if (!trainerId) {
          setError(
            "Trainer information not found. Please login again."
          );
          return;
        }

        const response = await api.get(
          `/trainers/students/${trainerId}`
        );

        if (response.data?.success) {
          setStudents(response.data.students || []);
        } else {
          setError(
            response.data?.message ||
              "Failed to load students"
          );
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load students"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [trainerId]);

  if (loading) {
    return (
      <div className="min-h-40 flex items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading students...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-32 bg-red-50 border border-red-200 text-red-600 rounded-xl flex flex-col justify-center gap-2">
        <h2 className="font-bold text-lg">
          Unable to load students
        </h2>

        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-800">
          My Students
        </h1>

        <p className="text-gray-500">
          Students who have booked your fitness classes.
        </p>
      </div>

      {/* Empty State */}
      {students.length === 0 ? (
        <div className="bg-white shadow rounded-xl min-h-64 flex flex-col items-center justify-center gap-4 text-center border border-gray-100">
          <FaUser className="text-5xl text-gray-300" />

          <h2 className="text-xl font-semibold text-gray-700">
            No Students Found
          </h2>

          <p className="text-gray-500">
            You don't have any students yet.
          </p>
        </div>
      ) : (
        /* Students */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div
              key={student._id}
              className="bg-white shadow-lg rounded-xl border border-gray-100 min-h-72 flex flex-col gap-4 hover:shadow-xl transition"
            >
              {/* Profile */}
              <div className="w-14 h-14 shrink-0 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                {student.profileImage ? (
                  <img
                    src={student.profileImage}
                    alt={student.name || "Student"}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="text-2xl text-blue-600" />
                )}
              </div>

              {/* Name */}
              <h2 className="text-xl font-bold text-gray-800">
                {student.name || "Student"}
              </h2>

              {/* Details */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaEnvelope className="text-blue-500 shrink-0" />

                  <span className="text-sm break-all">
                    {student.email || "No email"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <FaPhone className="text-green-500 shrink-0" />

                  <span className="text-sm">
                    {student.phone || "No phone"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <FaBookOpen className="text-purple-500 shrink-0" />

                  <span className="text-sm">
                    {student.totalClasses ?? 0} Classes
                  </span>
                </div>
              </div>

              {/* Recent Classes */}
              {Array.isArray(student.bookings) &&
                student.bookings.length > 0 && (
                  <div className="border-t border-gray-200 flex flex-col gap-3">
                    <h3 className="font-semibold text-gray-700">
                      Recent Classes
                    </h3>

                    <div className="flex flex-col gap-2">
                      {student.bookings
                        .slice(0, 3)
                        .map((booking) => (
                          <div
                            key={
                              booking.bookingId ||
                              booking._id
                            }
                            className="text-sm text-gray-500"
                          >
                            {booking.class?.name ||
                              booking.class?.title ||
                              booking.class?.className ||
                              "Fitness Class"}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrainerStudents;