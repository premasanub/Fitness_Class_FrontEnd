import yoga from "../assets/yoga.jpg";
import zumba from "../assets/zumba.jpg";
import cardio from "../assets/cardio.jpg";
import strength from "../assets/strength.jpg";

const classData = [
  {
    id: 1,
    className: "Yoga",
    trainer: "Sarah Williams",
    category: "Beginner",
    day: "Monday",
    timeSlots: [
    "7:00 AM - 8:00 AM",
    "8:30 AM - 9:30 AM",
    "5:00 PM - 6:00 PM"
],
    price: 500,
    seats: 10,
    image: yoga,
    description:
    "Improve flexibility, posture, breathing and reduce stress through guided yoga sessions.",
  },
  {
    id: 2,
   className: "Zumba",
    trainer: "Emily Johnson",
    category: "Intermediate",
    day: "Tuesday",
     timeSlots: [
    "7:00 AM - 8:00 AM",
    "10:00 AM - 11:00 AM",
    "6:00 PM - 7:00 PM",
  ],
    price: 700,
    seats: 8,
    image: zumba,
    description:
    "Improve flexibility, posture, breathing and reduce stress through guided yoga sessions.",
  },
  {
    id: 3,
    className: "Cardio",
    trainer: "David Miller",
    category: "Advanced",
    day: "Wednesday",
     timeSlots: [
    "800 AM - 900 AM",
    "10:00 AM - 11:00 AM",
    "6:00 PM - 7:00 PM",
  ],
    price: 800,
    seats: 12,
    image: cardio,
    description:
    "Improve flexibility, posture, breathing and reduce stress through guided yoga sessions.",
  },
  {
    id: 4,
    className: "Strength Training",
    trainer: "John Carter",
    category: "Advanced",
    day: "Friday",
     timeSlots: [
    "7:00 AM - 8:00 AM",
    "10:00 AM - 11:00 AM",
    "6:00 PM - 7:00 PM",
  ],
    price: 900,
    seats: 6,
    image: strength,
    description:
    "Improve flexibility, posture, breathing and reduce stress through guided yoga sessions.",
  },
];

export default classData;