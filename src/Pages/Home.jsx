
import Hero from "../Components/Hero";
import PopularClasses from "../Components/PopularClasses";
import TopTrainers from "../Components/TopTrainers";
import WhyChooseUs from "../Components/WhyChooseUs";
import StatsCounter from "../Components/StatsCounter";
import Testimonials from "../Components/Testimonials";
import Pricing from "../Components/Pricing";

function Home() {
  return (
    <div className="m-0 p-0">
      <Hero />
      <PopularClasses />
      <TopTrainers />
      <WhyChooseUs />
      <StatsCounter />
      <Testimonials />
      <Pricing />
    </div>
  );
}

export default Home;
