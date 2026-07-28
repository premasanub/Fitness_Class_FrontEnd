function TrainerStudents() {

  const students = [
    {
      id: 1,
      name: "John",
      class: "Yoga",
      age: 24,
      phone: "9876543210",
    },
    {
      id: 2,
      name: "Emma",
      class: "Cardio",
      age: 27,
      phone: "9876501234",
    },
    {
      id: 3,
      name: "David",
      class: "Strength",
      age: 30,
      phone: "9876512345",
    },
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        My Students
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {students.map((student) => (

          <div
            key={student.id}
            className="bg-white shadow-lg rounded-xl p-6"
          >

            <h2 className="text-xl font-bold">
              {student.name}
            </h2>

            <p className="mt-2">
              Class : {student.class}
            </p>

            <p>
              Age : {student.age}
            </p>

            <p>
              Phone : {student.phone}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TrainerStudents;