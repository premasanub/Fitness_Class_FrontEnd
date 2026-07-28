import { useParams, useNavigate } from "react-router-dom";
import classData from "../../data/classData";
import { useState } from "react";


function Booking() {
  const [selectedSlot, setSelectedSlot] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const selectedClass = classData.find(
    (item) => item.id === Number(id)
  );

  if (!selectedClass) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold">
          Class Not Found
        </h2>
      </div>
    );
  }

  const handleBooking=()=>{

alert(

`Booking Confirmed!

Class : ${selectedClass.className}

Trainer : ${selectedClass.trainer}

Slot : ${selectedSlot}`

);

navigate("/dashboard/bookings");

}

  // const handleBooking = () => {
  //   alert("Class booked successfully!");

  //   navigate("/dashboard/bookings");
  // };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Book Your Class
      </h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <img
          src={selectedClass.image}
          alt={selectedClass.className}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">

          <h2 className="text-3xl font-bold mb-4">
            {selectedClass.className}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">

            <p>
              <strong>Trainer:</strong>{" "}
              {selectedClass.trainer}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {selectedClass.category}
            </p>

            <p>
              <strong>Day:</strong>{" "}
              {selectedClass.day}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {selectedClass.time}
            </p>

            <p>
              <strong>Duration:</strong>{" "}
              {selectedClass.duration}
            </p>

            <p>
              <strong>Price:</strong>{" "}
              ₹{selectedClass.price}
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">

Available Time Slots

</h2>

<div className="space-y-3">

{selectedClass.timeSlots.map((slot,index)=>(

<label
key={index}
className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-100"
>

<input
type="radio"
name="slot"
value={slot}
onChange={(e)=>setSelectedSlot(e.target.value)}
/>

{slot}

</label>

))}

</div>



          </div>

         <button

disabled={!selectedSlot}

onClick={handleBooking}

className={`

mt-8

px-6

py-3

rounded-lg

text-white

${selectedSlot

?"bg-green-600 hover:bg-green-700"

:"bg-gray-400 cursor-not-allowed"

}

`}

>

Confirm Booking

</button>
        </div>

      </div>

    </div>
  );
}

export default Booking;