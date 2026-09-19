function About() {
  const features = [
    {
      title: "Expert Trainers",
      description:
        "Learn from experienced and certified fitness trainers.",
    },
    {
      title: "Flexible Classes",
      description:
        "Choose classes that fit your schedule and fitness goals.",
    },
    {
      title: "Easy Booking",
      description:
        "Book your favorite fitness classes quickly and easily.",
    },
    {
      title: "Track Progress",
      description:
        "Monitor your fitness journey and stay motivated.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Hero */}
      <section className="w-full bg-black text-white px-6 py-16 md:py-20">
        <div className="w-full max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About FitBook
          </h1>

          <p className="max-w-3xl mx-auto text-base md:text-lg text-gray-300 leading-7">
            FitBook is an online fitness class booking platform designed to
            make your fitness journey simple, flexible, and convenient.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left */}
          <div className="flex flex-col justify-center p-2 sm:p-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your Fitness Journey Starts Here
            </h2>

            <p className="text-gray-600 leading-7 mb-5">
              FitBook connects fitness enthusiasts with professional trainers
              and a variety of fitness classes. Users can explore classes,
              select suitable time slots, make bookings, and manage their
              fitness schedules from one place.
            </p>

            <p className="text-gray-600 leading-7">
              Our goal is to make fitness accessible and convenient by
              providing an easy-to-use platform for both users and trainers.
            </p>
          </div>

          {/* Right */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why FitBook?
            </h3>

            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-600">
                <span className="text-blue-600 font-bold">✓</span>
                Easy online class booking
              </li>

              <li className="flex gap-3 text-gray-600">
                <span className="text-blue-600 font-bold">✓</span>
                Professional and experienced trainers
              </li>

              <li className="flex gap-3 text-gray-600">
                <span className="text-blue-600 font-bold">✓</span>
                Flexible class schedules
              </li>

              <li className="flex gap-3 text-gray-600">
                <span className="text-blue-600 font-bold">✓</span>
                Simple and user-friendly experience
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            What We Offer
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-xl shadow-sm p-6 text-center hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-6">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

