import hero from "../assets/hero.jpg";

function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center m-0 p-0"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="bg-black/60 w-full h-full flex items-center m-0 p-0">

        <div className="text-white m-0 p-0">

          <span className="bg-blue-600 rounded m-0 p-0">
            #1 Fitness Booking Platform
          </span>

          <h1 className="text-6xl font-bold m-0 p-0">
            Transform Your
            <br />
            <span className="text-blue-500">Fitness</span> Journey
          </h1>

          <p className="text-xl m-0 p-0">
            Book professional trainers and
            <br />
            personalized fitness classes.
          </p>

          <div className="flex m-0 p-0">
            <button className="bg-blue-600 rounded-lg m-0 p-0">
              Explore Classes
            </button>

            <button className="border border-white rounded-lg m-0 p-0">
              Join Now
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
