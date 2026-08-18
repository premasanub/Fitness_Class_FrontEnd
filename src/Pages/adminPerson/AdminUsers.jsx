import { useEffect, useState } from "react";
import { FaUsers, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../Service/api";

function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  // =====================================================
  // GET USERS
  // =====================================================

  const fetchUsers = async () => {
    try {

      setLoading(true);

      const response = await api.get(
        "/admin/users"
      );

      if (response.data.success) {

        setUsers(
          response.data.users || []
        );

      }

    } catch (error) {

      console.log(
        "Fetch Admin Users Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
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
    <div className="space-y-8">


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div>

        <div className="flex items-center gap-3">

          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">

            <FaUsers className="text-2xl" />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Users
            </h1>

            <p className="text-gray-500 mt-1">
              Manage registered fitness users
            </p>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* USER COUNT */}
      {/* ================================================= */}

      <div className="bg-white rounded-xl shadow p-6">

        <p className="text-gray-500 text-sm font-semibold">
          Total Users
        </p>

        <p className="text-3xl font-bold text-gray-800 mt-2">
          {users.length}
        </p>

      </div>


      {/* ================================================= */}
      {/* LOADING */}
      {/* ================================================= */}

      {loading && (

        <div className="bg-white rounded-xl shadow p-10 text-center">

          <p className="text-gray-500">
            Loading users...
          </p>

        </div>

      )}


      {/* ================================================= */}
      {/* EMPTY */}
      {/* ================================================= */}

      {!loading && users.length === 0 && (

        <div className="bg-white rounded-xl shadow p-10 text-center">

          <FaUsers className="text-5xl text-gray-300 mx-auto mb-4" />

          <h2 className="text-xl font-semibold text-gray-700">
            No Users Found
          </h2>

          <p className="text-gray-500 mt-2">
            No registered users are available.
          </p>

        </div>

      )}


      {/* ================================================= */}
      {/* USERS TABLE */}
      {/* ================================================= */}

      {!loading && users.length > 0 && (

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 border-b">

                <tr>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    User
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Email
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Phone
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Role
                  </th>

                </tr>

              </thead>


              <tbody>

                {users.map((user) => (

                  <tr
                    key={user._id}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition"
                  >


                    {/* USER */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        {user.profileImage ? (

                          <img
                            src={user.profileImage}
                            alt={user.name}
                            className="w-11 h-11 rounded-full object-cover"
                          />

                        ) : (

                          <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">

                            <FaUser />

                          </div>

                        )}


                        <div>

                          <p className="font-semibold text-gray-800">
                            {user.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            ID: {user._id.slice(-6)}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* EMAIL */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 text-gray-600">

                        <FaEnvelope className="text-blue-500" />

                        <span>
                          {user.email}
                        </span>

                      </div>

                    </td>


                    {/* PHONE */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 text-gray-600">

                        <FaPhone className="text-green-500" />

                        <span>
                          {user.phone || "Not provided"}
                        </span>

                      </div>

                    </td>


                    {/* ROLE */}

                    <td className="px-6 py-5">

                      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

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