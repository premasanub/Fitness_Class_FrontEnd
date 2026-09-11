// import hero from "../assets/hero.jpg";
// import {Link} from "react-router-dom";

// function Hero() {
//   return (
//     <section
//       className="h-screen bg-cover bg-center flex items-center"
//       style={{ backgroundImage: `url(${hero})` }}
//     >
//       <div className="bg-black/60 w-full h-full flex items-center">

//         <div className="ml-20 text-white">

//           <span className="bg-blue-600 px-4 py-2 rounded">
//             #1 Fitness Booking Platform
//           </span>

//           <h1 className="text-6xl font-bold mt-8">
//             Transform Your
//             <br />
//             <span className="text-blue-500">
//               Fitness
//             </span>{" "}
//             Journey
//           </h1>

//           <p className="mt-6 text-xl">
//             Book professional trainers and
//             <br />
//             personalized fitness classes.
//           </p>

//           <div className="mt-8 flex gap-5">
//             <Link to="/classes">
//               <button className="bg-blue-600 px-8 py-3 rounded-lg">
//                 Explore Classes
//               </button>
//             </Link>

//             <Link to="/register">
//               <button className="border border-white px-8 py-3 rounded-lg">
//                 Join Now
//               </button>
//             </Link>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }

// export default Hero;

import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";

function Hero() {
  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="w-full min-h-screen bg-black/60 flex items-center">
        <div className="w-full max-w-4xl text-white flex flex-col gap-6">
          <div>
            <span className="inline-flex items-center min-h-10 bg-blue-600 rounded-lg text-sm font-semibold indent-3 pr-3">
              #1 Fitness Booking Platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Transform Your
            <br />
            <span className="text-blue-500">Fitness</span> Journey
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
            Book professional trainers and
            <br />
            personalized fitness classes.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/classes">
              <button className="min-h-11 min-w-40 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
                Explore Classes
              </button>
            </Link>

            <Link to="/register">
              <button className="min-h-11 min-w-32 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition flex items-center justify-center">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;