import yoga from "../assets/yoga.jpg";
import zumba from "../assets/zumba.jpg";
import cardio from "../assets/cardio.jpg";
import strength from "../assets/strength.jpg";

const classes = [
  {
    id: 1,
    title: "Yoga",
    trainer: "Sarah Williams",
    category: "Beginner",
    day: "Monday",
    time: "7:00 AM - 8:00 AM",
    price: 500,
    seats: 10,
    image: yoga,
  },
  {
    id: 2,
    title: "Zumba",
    trainer: "Emily Johnson",
    category: "Intermediate",
    day: "Tuesday",
    time: "6:00 PM - 7:00 PM",
    price: 700,
    seats: 8,
    image: zumba,
  },
  {
    id: 3,
    title: "Cardio",
    trainer: "David Miller",
    category: "Advanced",
    day: "Wednesday",
    time: "5:00 PM - 6:00 PM",
    price: 800,
    seats: 12,
    image: cardio,
  },
  {
    id: 4,
    title: "Strength Training",
    trainer: "John Carter",
    category: "Advanced",
    day: "Friday",
    time: "8:00 AM - 9:00 AM",
    price: 900,
    seats: 6,
    image: strength,
  },
];

export default classes;