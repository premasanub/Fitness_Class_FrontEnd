import bookingData from "../../data/bookingData";
import BookingCard from "../../Components/BookingCard";

function MyBookings(){

return(

<div className="p-6">

<h1 className="text-3xl font-bold mb-6">

My Bookings

</h1>

<div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">

{

bookingData.map((booking)=>(

<BookingCard

key={booking.id}

booking={booking}

/>

))

}

</div>

</div>

);

}

export default MyBookings;