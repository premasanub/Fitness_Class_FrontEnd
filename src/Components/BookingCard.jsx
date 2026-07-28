import { useNavigate } from "react-router-dom";

function BookingCard({ booking }) {

const navigate=useNavigate();

return(

<div className="bg-white shadow-lg rounded-xl overflow-hidden">

<img
src={booking.image}
alt={booking.className}
className="w-full h-52 object-cover"
/>

<div className="p-5">

<h2 className="text-2xl font-bold">

{booking.className}

</h2>

<p>

Trainer : {booking.trainer}

</p>

<p>

Date : {booking.date}

</p>

<p>

Time : {booking.time}

</p>

<p>

Status :

<span
className={`ml-2 font-semibold
${booking.status==="Upcoming"
?"text-green-600"
:"text-blue-600"
}`}
>

{booking.status}

</span>

</p>

<div className="flex gap-3 mt-5">

<button

onClick={() =>
  navigate(`/dashboard/classes/${booking.id}`, {
    state: { fromBookings: true },
  })
}
>

View Details

</button>

{
booking.status==="Upcoming" &&(

<button

className="bg-red-600 text-white px-4 py-2 rounded-lg"

>

Cancel Booking

</button>

)

}

{

booking.status==="Completed" &&(

<button

onClick={()=>navigate("/dashboard/feedback")}

className="bg-yellow-500 text-white px-4 py-2 rounded-lg"

>

Give Feedback

</button>

)

}

</div>

</div>

</div>

);

}

export default BookingCard;