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
    <section className="py-20">

      <h4 className="text-center text-blue-600 font-semibold">
        MEMBERSHIP
      </h4>

      <h1 className="text-5xl font-bold text-center mt-3">
        Pricing Plans
      </h1>

      <div className="grid md:grid-cols-3 gap-8 px-10 mt-12">

        {plans.map((plan, index) => (

          <div
            key={index}
            className="border rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition"
          >

            <h2 className="text-3xl font-bold">
              {plan.title}
            </h2>

            <h1 className="text-5xl text-blue-600 font-bold my-6">
              {plan.price}
            </h1>

            {plan.features.map((feature, i) => (
              <p key={i} className="mb-3">
                ✔ {feature}
              </p>
            ))}

            <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg">
              Choose Plan
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Pricing;