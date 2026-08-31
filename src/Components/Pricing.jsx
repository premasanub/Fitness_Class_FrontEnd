function Pricing() {
  const plans = [
    {
      title: "Basic",
      price: "$29",
      features: ["3 Classes / Week", "Community Support", "Basic Trainers"],
    },
    {
      title: "Premium",
      price: "$59",
      features: ["Unlimited Classes", "Personal Trainer", "Diet Plan"],
    },
    {
      title: "Pro",
      price: "$99",
      features: ["Everything Included", "24/7 Support", "Priority Booking"],
    },
  ];

  return (
    <section className="m-0 p-0">
      <h4 className="text-center text-blue-600 font-semibold m-0 p-0">
        MEMBERSHIP
      </h4>

      <h1 className="text-5xl font-bold text-center m-0 p-0">
        Pricing Plans
      </h1>

      <div className="grid md:grid-cols-3 m-0 p-0">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="border rounded-xl shadow-lg text-center hover:shadow-2xl transition m-0 p-0"
          >
            <h2 className="text-3xl font-bold m-0 p-0">
              {plan.title}
            </h2>

            <h1 className="text-5xl text-blue-600 font-bold m-0 p-0">
              {plan.price}
            </h1>

            {plan.features.map((feature, i) => (
              <p key={i} className="m-0 p-0">
                ✔ {feature}
              </p>
            ))}

            <button className="bg-blue-600 text-white rounded-lg m-0 p-0">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
