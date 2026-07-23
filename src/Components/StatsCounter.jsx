function StatsCounter() {
  const stats = [
    {
      number: "5000+",
      title: "Happy Members",
    },
    {
      number: "50+",
      title: "Expert Trainers",
    },
    {
      number: "120+",
      title: "Fitness Classes",
    },
    {
      number: "98%",
      title: "Success Rate",
    },
  ];

  return (
    <section className="bg-blue-600 text-white py-16">

      <div className="grid md:grid-cols-4 text-center">

        {stats.map((item, index) => (

          <div key={index}>

            <h1 className="text-5xl font-bold">
              {item.number}
            </h1>

            <p className="mt-3 text-xl">
              {item.title}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default StatsCounter;