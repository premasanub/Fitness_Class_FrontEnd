import { useEffect, useState } from "react";
import {
  FaUsers,
  FaEnvelope,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../Service/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/users");

      if (response.data.success) {
        setUsers(response.data.users || []);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 p-1">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 shrink-0 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
          <FaUsers className="text-2xl" />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Users
          </h1>

          <p className="text-gray-500">
            Manage registered fitness users
          </p>
        </div>
      </div>

      {/* User Count */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col gap-2">
          <p className="text-gray-500 text-sm font-semibold">
            Total Users
          </p>

          <p className="text-3xl font-bold text-gray-800">
            {users.length}
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-48 p-6 flex items-center justify-center">
          <p className="text-gray-500 font-medium">
            Loading users...
          </p>
        </div>
      )}

      {/* Empty */}
      {!loading && users.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-72 p-8 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <FaUsers className="text-4xl text-gray-300" />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-gray-700">
              No Users Found
            </h2>

            <p className="text-gray-500">
              No registered users are available.
            </p>
          </div>
        </div>
      )}

      {/* Users Table */}
      {!loading && users.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    User
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    Email
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    Phone
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    Role
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
                  >
                    {/* User */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.name}
                            className="w-11 h-11 rounded-full object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <FaUser />
                          </div>
                        )}

                        <div className="flex flex-col gap-1 min-w-0">
                          <p className="font-semibold text-gray-800 break-words">
                            {user.name}
                          </p>

                          <p className="text-xs text-gray-400 break-all">
                            ID: {user._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-5">
                      <div className="flex items-start gap-2 text-gray-600">
                        <FaEnvelope className="text-blue-500 shrink-0 mt-1" />

                        <span className="break-all">
                          {user.email}
                        </span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaPhone className="text-green-500 shrink-0" />

                        <span>
                          {user.phone || "Not provided"}
                        </span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-5">
                      <span className="inline-flex px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        User
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;