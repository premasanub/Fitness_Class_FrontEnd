function StatsCounter() {
  const stats = [
    { number: "5000+", title: "Happy Members" },
    { number: "50+", title: "Expert Trainers" },
    { number: "120+", title: "Fitness Classes" },
    { number: "98%", title: "Success Rate" },
  ];

  return (
    <section className="bg-blue-600 text-white m-0 p-0">
      <div className="grid md:grid-cols-4 text-center m-0 p-0">
        {stats.map((item, index) => (
          <div key={index} className="m-0 p-0">
            <h1 className="text-5xl font-bold m-0 p-0">
              {item.number}
            </h1>
            <p className="text-xl m-0 p-0">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsCounter;
