import popularClasses from "../data/popularClasses";
import PopularClassCard from "./PopularClassCard";

function PopularClasses() {
  return (
    <section className="py-16 px-6">

      <h2 className="text-4xl font-bold text-center mb-10">
        Popular Classes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {popularClasses.map((item) => (
          <PopularClassCard
            key={item.id}
            item={item}
          />
        ))}

      </div>

    </section>
  );
}

export default PopularClasses;