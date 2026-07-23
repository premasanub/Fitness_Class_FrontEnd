import classes from "../../data/classes";
import ClassCard from "../../components/ClassCard";

function Classes() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Available Classes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((item) => (
          <ClassCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

export default Classes;