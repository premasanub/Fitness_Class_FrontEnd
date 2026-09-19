function StatsCounter() {
  const stats = [
    { number: "5000+", title: "Happy Members" },
    { number: "50+", title: "Expert Trainers" },
    { number: "120+", title: "Fitness Classes" },
    { number: "98%", title: "Success Rate" },
  ];

  return (
    <section className="w-full bg-blue-600 text-white px-5 sm:px-8 py-10">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="min-h-36 px-4 py-6 flex flex-col items-center justify-center gap-2 border-b md:border-b-0 md:border-r last:border-r-0 border-blue-400"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              {item.number}
            </h1>

            <p className="text-base md:text-xl text-blue-50 text-center">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsCounter;