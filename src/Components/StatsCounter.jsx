// function StatsCounter() {
//   const stats = [
//     { number: "5000+", title: "Happy Members" },
//     { number: "50+", title: "Expert Trainers" },
//     { number: "120+", title: "Fitness Classes" },
//     { number: "98%", title: "Success Rate" },
//   ];

//   return (
//     <section className="bg-blue-600 text-white m-0 p-0">
//       <div className="grid md:grid-cols-4 text-center m-0 p-0">
//         {stats.map((item, index) => (
//           <div key={index} className="m-0 p-0">
//             <h1 className="text-5xl font-bold m-0 p-0">
//               {item.number}
//             </h1>
//             <p className="text-xl m-0 p-0">
//               {item.title}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default StatsCounter;

function StatsCounter() {
  const stats = [
    { number: "5000+", title: "Happy Members" },
    { number: "50+", title: "Expert Trainers" },
    { number: "120+", title: "Fitness Classes" },
    { number: "98%", title: "Success Rate" },
  ];

  return (
    <section className="w-full bg-blue-600 text-white">
      <div className="w-full grid grid-cols-2 md:grid-cols-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="min-h-36 flex flex-col items-center justify-center gap-2 border-b md:border-b-0 md:border-r last:border-r-0 border-blue-400"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              {item.number}
            </h1>

            <p className="text-base md:text-xl text-blue-50">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsCounter;