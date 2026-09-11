// function Pricing() {
//   const plans = [
//     {
//       title: "Basic",
//       price: "$29",
//       features: [
//         "3 Classes / Week",
//         "Community Support",
//         "Basic Trainers",
//       ],
//     },
//     {
//       title: "Premium",
//       price: "$59",
//       features: [
//         "Unlimited Classes",
//         "Personal Trainer",
//         "Diet Plan",
//       ],
//     },
//     {
//       title: "Pro",
//       price: "$99",
//       features: [
//         "Everything Included",
//         "24/7 Support",
//         "Priority Booking",
//       ],
//     },
//   ];

//   return (
//     <section className="bg-white py-16 md:py-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Heading */}
//         <div className="text-center mb-12">
//           <p className="text-blue-600 font-semibold text-lg">
//             MEMBERSHIP
//           </p>

//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
//             Pricing Plans
//           </h1>
//         </div>

//         {/* Pricing Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
//           {plans.map((plan, index) => (
//             <div
//               key={index}
//               className="bg-white border border-gray-200
//                          rounded-2xl shadow-md
//                          p-8 text-center
//                          min-h-[390px]
//                          flex flex-col
//                          hover:shadow-xl
//                          hover:-translate-y-1
//                          transition-all duration-300"
//             >
//               {/* Plan */}
//               <h2 className="text-3xl font-bold text-gray-900">
//                 {plan.title}
//               </h2>

//               {/* Price */}
//               <h1 className="text-5xl text-blue-600 font-bold my-6">
//                 {plan.price}
//               </h1>

//               {/* Features */}
//               <div className="space-y-3 flex-grow">
//                 {plan.features.map((feature, i) => (
//                   <p
//                     key={i}
//                     className="text-gray-700 text-base"
//                   >
//                     <span className="text-blue-600 font-bold mr-2">
//                       ✓
//                     </span>
//                     {feature}
//                   </p>
//                 ))}
//               </div>

//               {/* Button */}
//               <button
//                 className="mt-8 w-full bg-blue-600
//                            hover:bg-blue-700
//                            text-white font-semibold
//                            py-3 px-6
//                            rounded-lg
//                            transition duration-300"
//               >
//                 Choose Plan
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Pricing;


function Pricing() {
  const plans = [
    {
      title: "Basic",
      price: "$29",
      features: [
        "3 Classes / Week",
        "Community Support",
        "Basic Trainers",
      ],
    },
    {
      title: "Premium",
      price: "$59",
      features: [
        "Unlimited Classes",
        "Personal Trainer",
        "Diet Plan",
      ],
    },
    {
      title: "Pro",
      price: "$99",
      features: [
        "Everything Included",
        "24/7 Support",
        "Priority Booking",
      ],
    },
  ];

  return (
    <section className="bg-white">
      <div className="w-full max-w-7xl flex flex-col gap-10">
        <div className="text-center flex flex-col gap-3">
          <p className="text-blue-600 font-semibold text-lg">
            MEMBERSHIP
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Pricing Plans
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-md min-h-[390px] flex flex-col gap-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                {plan.title}
              </h2>

              <h1 className="text-5xl text-blue-600 font-bold">
                {plan.price}
              </h1>

              <div className="flex flex-col gap-3 flex-grow">
                {plan.features.map((feature, i) => (
                  <p
                    key={i}
                    className="text-gray-700 text-base flex items-center justify-center gap-2"
                  >
                    <span className="text-blue-600 font-bold">
                      ✓
                    </span>
                    {feature}
                  </p>
                ))}
              </div>

              <button
                className="w-full min-h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center"
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;