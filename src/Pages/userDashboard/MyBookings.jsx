import { useEffect, useState } from "react";
import api from "../../Service/api";
import BookingCard from "../../Components/BookingCard";

function MyBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

     const response = await api.get(`/bookings/user/${user._id}`);

      setBookings(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">

        My Bookings

      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">

        {bookings.map((booking) => (

          <BookingCard
            key={booking._id}
            booking={booking}
          />

        ))}

      </div>

    </div>

  );

}

export default MyBookings;