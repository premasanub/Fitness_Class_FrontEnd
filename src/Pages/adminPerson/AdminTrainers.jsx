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


  // =====================================================
  // FETCH TRAINERS
  // =====================================================

  const fetchTrainers = async () => {

    try {

      setLoading(true);

      const response = await api.get(
        "/admin/trainers"
      );

      if (response.data.success) {

        setTrainers(
          response.data.trainers || []
        );

      }

    } catch (error) {

      console.log(
        "Fetch Admin Trainers Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to load trainers"
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // USE EFFECT
  // =====================================================

  useEffect(() => {

    fetchTrainers();

  }, []);


  return (

    <div className="space-y-8">


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div>

        <div className="flex items-center gap-3">

          <div className="bg-green-100 text-green-600 p-3 rounded-xl">

            <FaUserTie className="text-2xl" />

          </div>


          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Trainers
            </h1>

            <p className="text-gray-500 mt-1">
              Manage fitness trainers
            </p>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* TOTAL TRAINERS */}
      {/* ================================================= */}

      <div className="bg-white rounded-xl shadow p-6">

        <p className="text-gray-500 text-sm font-semibold">
          Total Trainers
        </p>

        <p className="text-3xl font-bold text-gray-800 mt-2">
          {trainers.length}
        </p>

      </div>


      {/* ================================================= */}
      {/* LOADING */}
      {/* ================================================= */}

      {loading && (

        <div className="bg-white rounded-xl shadow p-10 text-center">

          <p className="text-gray-500">
            Loading trainers...
          </p>

        </div>

      )}


      {/* ================================================= */}
      {/* EMPTY */}
      {/* ================================================= */}

      {!loading && trainers.length === 0 && (

        <div className="bg-white rounded-xl shadow p-10 text-center">

          <FaUserTie className="text-5xl text-gray-300 mx-auto mb-4" />

          <h2 className="text-xl font-semibold text-gray-700">
            No Trainers Found
          </h2>

          <p className="text-gray-500 mt-2">
            No trainers are currently registered.
          </p>

        </div>

      )}


      {/* ================================================= */}
      {/* TRAINER CARDS */}
      {/* ================================================= */}

      {!loading && trainers.length > 0 && (

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {trainers.map((trainer) => (

            <div
              key={trainer._id}
              className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden hover:shadow-lg transition"
            >


              {/* ================================================= */}
              {/* PROFILE */}
              {/* ================================================= */}

              <div className="p-6">

                <div className="flex items-center gap-4">


                  {/* IMAGE */}

                  {trainer.profileImage ? (

                    <img
                      src={trainer.profileImage}
                      alt={trainer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />

                  ) : (

                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center">

                      <FaUserTie className="text-2xl" />

                    </div>

                  )}


                  {/* NAME */}

                  <div>

                    <h2 className="text-lg font-bold text-gray-800">
                      {trainer.name}
                    </h2>

                    <span className="inline-block mt-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Trainer
                    </span>

                  </div>

                </div>


                {/* ================================================= */}
                {/* EMAIL */}
                {/* ================================================= */}

                <div className="flex items-center gap-3 mt-6 text-gray-600">

                  <FaEnvelope className="text-blue-500" />

                  <span className="text-sm break-all">
                    {trainer.email}
                  </span>

                </div>


                {/* ================================================= */}
                {/* PHONE */}
                {/* ================================================= */}

                <div className="flex items-center gap-3 mt-3 text-gray-600">

                  <FaPhone className="text-green-500" />

                  <span className="text-sm">
                    {trainer.phone || "Not provided"}
                  </span>

                </div>


                {/* ================================================= */}
                {/* SPECIALIZATION */}
                {/* ================================================= */}

                <div className="flex items-center gap-3 mt-3 text-gray-600">

                  <FaBriefcase className="text-purple-500" />

                  <span className="text-sm">

                    {trainer.specialization ||
                      "General Fitness"}

                  </span>

                </div>


                {/* ================================================= */}
                {/* EXPERIENCE */}
                {/* ================================================= */}

                <div className="flex items-center gap-3 mt-3 text-gray-600">

                  <FaUsers className="text-orange-500" />

                  <span className="text-sm">

                    {trainer.experience || 0} years experience

                  </span>

                </div>


                {/* ================================================= */}
                {/* RATING */}
                {/* ================================================= */}

                <div className="flex items-center gap-2 mt-5 pt-4 border-t">

                  <FaStar className="text-yellow-500" />

                  <span className="font-bold text-gray-800">

                    {trainer.rating
                      ? trainer.rating
                      : "0.0"}

                  </span>

                  <span className="text-gray-400 text-sm">
                    Rating
                  </span>

                </div>


                {/* ================================================= */}
                {/* STATUS */}
                {/* ================================================= */}

                <div className="mt-4">

                  {trainer.isActive !== false ? (

                    <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                      Active
                    </span>

                  ) : (

                    <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
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