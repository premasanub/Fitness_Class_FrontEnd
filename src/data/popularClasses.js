import yoga from "../assets/yoga.jpg";
import zumba from "../assets/zumba.jpg";
import cardio from "../assets/cardio.jpg";
import strength from "../assets/strength.jpg";

const popularClasses = [
  {
    id: 1,
    image: yoga,
    title: "Yoga",
    category: "Yoga",
    description:
      "Improve flexibility, posture and reduce stress with guided yoga sessions.",
    duration: "60 Minutes",
    level: "Beginner",
  },

  {
    id: 2,
    image: zumba,
    title: "Zumba",
    category: "Zumba",
    description:
      "Fun dance workout that helps burn calories and improve stamina.",
    duration: "45 Minutes",
    level: "Intermediate",
  },

  {
    id: 3,
    image: cardio,
    title: "Cardio Blast",
    category: "Cardio",
    description:
      "High-intensity cardio workout to improve heart health and endurance.",
    duration: "50 Minutes",
    level: "Advanced",
  },

  {
    id: 4,
    image: strength,
    title: "Strength Training",
    category: "Strength Training",
    description:
      "Build muscle strength with guided weight training exercises.",
    duration: "60 Minutes",
    level: "Advanced",
  },
];

export default popularClasses;