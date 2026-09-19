import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Service/api";
import TrainerCard from "../components/TrainerCard";

function Trainers() {
  const navigate = useNavigate();

  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await api.get("/trainers");

        setTrainers(response.data.trainers || []);
      } catch (error) {
        setTrainers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="w-full max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center px-4 py-6 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Trainers
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600 leading-7">
            Meet our experienced fitness trainers and find the right
            professional to support your fitness journey.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <p className="text-gray-600">
              Loading trainers...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && trainers.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No Trainers Available
            </h2>

            <p className="text-gray-600">
              Trainers will appear here once they are available.
            </p>
          </div>
        )}

        {/* Trainers */}
        {!loading && trainers.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {trainers.map((trainer) => (
              <TrainerCard
                key={trainer._id}
                trainer={trainer}
                onClick={() =>
                  navigate(`/trainers/${trainer._id}`)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Trainers;
