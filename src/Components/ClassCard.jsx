import { FaClock, FaSignal } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ClassCard({ item }) {
  const navigate = useNavigate();
  console.log(item);
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl duration-300">

      <img src={item.image} alt={item.title} />

      <div className="p-5">

        <h2 className="text-2xl font-bold">
          {item.title}
        </h2>

        <p className="text-gray-600 mt-2">
          Trainer: {item.trainer}
        </p>

        <p className="text-gray-600">
          Category: {item.category}
        </p>

        <p className="text-gray-600">
          Day: {item.day}
        </p>

        <p className="text-gray-600">
          Time: {item.time}
        </p>

        <p className="text-blue-600 font-semibold mt-2">
          ₹ {item.price}
        </p>

        <p className="text-green-600">
          Seats Available : {item.seats}
        </p>

        <div className="flex gap-3 mt-5">
        



      <button
  type="button"
  onClick={() => {
    console.log("VIEW DETAILS CLICKED", item.id);
    alert("Button clicked");
    navigate(`/dashboard/classes/${item.id}`);
  }}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
>
  View Details
</button>
          <button 
          type="button"
          onClick={()=>{
            // alert("Class booked successfully!");

            navigate(`/dashboard/booking/${item.id}`);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Book Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default ClassCard;


