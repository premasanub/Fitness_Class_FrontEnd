import { useEffect, useState } from "react";
import {
  FaUsers,
  FaEnvelope,
  FaPhone,
  FaUserTie,
  FaStar,
  FaBriefcase,
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../Service/api";

function AdminTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrainers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/trainers");

      if (response.data.success) {
        setTrainers(response.data.trainers || []);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load trainers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
          <FaUserTie className="text-2xl" />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-gray-800">
            Trainers
          </h1>

          <p className="text-gray-500">
            Manage fitness trainers
          </p>
        </div>
      </div>

      {/* Total Trainers */}
      <div className="bg-white rounded-xl shadow border border-gray-100 min-h-28 flex items-center">
        <div className="w-[90%] self-center flex flex-col gap-2">
          <p className="text-gray-500 text-sm font-semibold">
            Total Trainers
          </p>

          <p className="text-3xl font-bold text-gray-800">
            {trainers.length}
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl shadow border border-gray-100 min-h-48 flex items-center justify-center">
          <p className="text-gray-500 font-medium">
            Loading trainers...
          </p>
        </div>
      )}

      {/* Empty */}
      {!loading && trainers.length === 0 && (
        <div className="bg-white rounded-xl shadow border border-gray-100 min-h-72 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <FaUserTie className="text-4xl text-gray-300" />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-gray-700">
              No Trainers Found
            </h2>

            <p className="text-gray-500">
              No trainers are currently registered.
            </p>
          </div>
        </div>
      )}

      {/* Trainer Cards */}
      {!loading && trainers.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <div
              key={trainer._id}
              className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden hover:shadow-lg transition"
            >
              <div className="w-[88%] self-center flex flex-col gap-5 py-5">

                {/* Profile */}
                <div className="flex items-center gap-4">
                  {trainer.profileImage ? (
                    <img
                      src={trainer.profileImage}
                      alt={trainer.name}
                      className="w-16 h-16 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                      <FaUserTie className="text-2xl" />
                    </div>
                  )}

                  <div className="flex flex-col gap-2 min-w-0">
                    <h2 className="text-lg font-bold text-gray-800 break-words">
                      {trainer.name}
                    </h2>

                    <span className="w-fit min-h-7 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center justify-center">
                      Trainer
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-3">

                  <div className="flex items-center gap-3 text-gray-600 min-h-7">
                    <FaEnvelope className="text-blue-500 shrink-0" />

                    <span className="text-sm break-all">
                      {trainer.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600 min-h-7">
                    <FaPhone className="text-green-500 shrink-0" />

                    <span className="text-sm">
                      {trainer.phone || "Not provided"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600 min-h-7">
                    <FaBriefcase className="text-purple-500 shrink-0" />

                    <span className="text-sm">
                      {trainer.specialization || "General Fitness"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600 min-h-7">
                    <FaUsers className="text-orange-500 shrink-0" />

                    <span className="text-sm">
                      {trainer.experience || 0} years experience
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="border-t border-gray-200 min-h-12 flex items-center gap-2">
                  <FaStar className="text-yellow-500" />

                  <span className="font-bold text-gray-800">
                    {trainer.rating || "0.0"}
                  </span>

                  <span className="text-gray-400 text-sm">
                    Rating
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center">
                  {trainer.isActive !== false ? (
                    <span className="w-24 min-h-9 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center justify-center">
                      Active
                    </span>
                  ) : (
                    <span className="w-24 min-h-9 bg-red-100 text-red-700 rounded-full text-sm font-semibold flex items-center justify-center">
                      Inactive
                    </span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminTrainers;