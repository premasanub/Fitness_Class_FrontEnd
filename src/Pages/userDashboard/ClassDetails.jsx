
import { useParams, useNavigate, useLocation } from "react-router-dom";
import classData from "../../data/classData";

function ClassDetails() {

    const { id } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const fromBookings = location.state?.fromBookings || false;
    console.log(fromBookings);

    const selectedClass = classData.find(
        (item) => item.id === Number(id)
    );

    if (!selectedClass) {
        return <h2>Class Not Found</h2>;
    }

    return (
        <div className="max-w-5xl mx-auto p-8">

            <img
                src={selectedClass.image}
                alt={selectedClass.className}
                className="w-full h-98 object-cover rounded-xl"
            />

            <h1 className="text-4xl font-bold mt-6">
                {selectedClass.className}
            </h1>

            <p className="mt-3">
                <strong>Trainer:</strong> {selectedClass.trainer}
            </p>

            <p>
                <strong>Category:</strong> {selectedClass.category}
            </p>

            <p>
                <strong>Day:</strong> {selectedClass.day}
            </p>

            <p>
                <strong>Time:</strong> {selectedClass.time}
            </p>

            <p>
                <strong>Duration:</strong> {selectedClass.duration}
            </p>

            <p>
                <strong>Price:</strong> ₹{selectedClass.price}
            </p>

            <p>
                <strong>Seats:</strong> {selectedClass.seats}
            </p>

            <p>
                <strong>Rating:</strong> ⭐ {selectedClass.rating}
            </p>

            <p className="mt-5 text-gray-700">
                {selectedClass.description}
            </p>

          {!fromBookings && (
  <button
    type="button"
    onClick={() =>
      navigate(`/dashboard/booking/${selectedClass.id}`)
    }
    className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
  >
    Book Now
  </button>
)}

        </div>
    );
}

export default ClassDetails;