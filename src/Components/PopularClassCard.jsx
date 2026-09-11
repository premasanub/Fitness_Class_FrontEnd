// import { FaClock, FaSignal } from "react-icons/fa";

// function PopularClassCard({ item }) {
//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

//       {/* Class Image */}
//       <img
//         src={item.image}
//         alt={item.title}
//         className="w-full h-56 object-cover"
//       />

//       {/* Card Content */}
//       <div className="p-6">

//         <h2 className="text-2xl font-bold mb-3">
//           {item.title}
//         </h2>

//         <p className="text-gray-600 mb-4">
//           {item.description}
//         </p>

//         <div className="flex justify-between text-gray-700 mb-5">

//           <div className="flex items-center gap-2">
//             <FaClock className="text-blue-600" />
//             <span>{item.duration}</span>
//           </div>

//           <div className="flex items-center gap-2">
//             <FaSignal className="text-green-600" />
//             <span>{item.level}</span>
//           </div>

//         </div>

//         <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
//           Learn More
//         </button>

//       </div>

//     </div>
//   );
// }

// export default PopularClassCard;

import { FaClock, FaSignal } from "react-icons/fa";

function PopularClassCard({ item, onLearnMore }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-100">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-56 object-cover"
      />

      <div className="flex flex-col gap-5 min-h-64">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-gray-900">
            {item.title}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-gray-700">
          <div className="flex items-center gap-2">
            <FaClock className="text-blue-600" />
            <span>{item.duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaSignal className="text-green-600" />
            <span>{item.level}</span>
          </div>
        </div>

        <button
          onClick={onLearnMore}
          className="w-full min-h-11 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

export default PopularClassCard;