import hero from "../assets/hero.jpg";

function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="bg-black/60 w-full h-full flex items-center">

        <div className="ml-20 text-white">

          <span className="bg-blue-600 px-4 py-2 rounded">
            #1 Fitness Booking Platform
          </span>

          <h1 className="text-6xl font-bold mt-8">
            Transform Your
            <br />
            <span className="text-blue-500">
              Fitness
            </span>{" "}
            Journey
          </h1>

          <p className="mt-6 text-xl">
            Book professional trainers and
            <br />
            personalized fitness classes.
          </p>

          <div className="mt-8 flex gap-5">
            <button className="bg-blue-600 px-8 py-3 rounded-lg">
              Explore Classes
            </button>

            <button className="border border-white px-8 py-3 rounded-lg">
              Join Now
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;

