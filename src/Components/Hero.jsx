import hero from "../assets/hero.jpg";

function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="bg-black/60 w-full h-full flex items-center">

        <div className="text-white">

          <span className="bg-blue-600">
            #1 Fitness Booking Platform
          </span>

          <h1 className="text-6xl font-bold">
            Transform Your
            <br />
            <span className="text-blue-500">
              Fitness
            </span>{" "}
            Journey
          </h1>

          <p className="text-xl">
            Book professional trainers and
            <br />
            personalized fitness classes.
          </p>

          <div className="flex">
            <button className="bg-blue-600 text-white">
              Explore Classes
            </button>

            <button className="border border-white text-white">
              Join Now
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;

