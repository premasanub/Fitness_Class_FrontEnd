import { useState } from "react";
import api from "../../Service/api";
import { toast } from "react-toastify";

const AddClass = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    price: "",
    seats: "",
    meetingLink: "",
    timeSlots: [],
  });

  const [slot, setSlot] = useState("");

  // ==============================
  // Handle Input Change
  // ==============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==============================
  // Add Time Slot
  // ==============================
  const addSlot = () => {
    if (!slot) {
      toast.error("Please select a time slot");
      return;
    }

    // Prevent duplicate slot
    if (formData.timeSlots.includes(slot)) {
      toast.error("This time slot is already added");
      return;
    }

    setFormData({
      ...formData,
      timeSlots: [...formData.timeSlots, slot],
    });

    setSlot("");
  };

  // ==============================
  // Remove Time Slot
  // ==============================
  const removeSlot = (slotToRemove) => {
    setFormData({
      ...formData,
      timeSlots: formData.timeSlots.filter(
        (item) => item !== slotToRemove
      ),
    });
  };

  // ==============================
  // Submit Class
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check time slots
    if (formData.timeSlots.length === 0) {
      toast.error("Please add at least one available time slot");
      return;
    }

    try {
      const trainer = JSON.parse(
        localStorage.getItem("user")
      );

      if (!trainer?._id) {
        toast.error("Trainer login required");
        return;
      }

      const classData = {
        ...formData,
        trainer: trainer._id,
      };

      console.log("CLASS DATA:", classData);

      await api.post("/classes", classData);

      toast.success("Class Added Successfully");

      // Reset form
      setFormData({
        title: "",
        category: "",
        description: "",
        date: "",
        time: "",
        duration: "",
        price: "",
        seats: "",
        meetingLink: "",
        timeSlots: [],
      });

      setSlot("");

    } catch (error) {
      console.log(
        "ADD CLASS ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Error adding class"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Add New Class
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* ==============================
            Title
        ============================== */}

        <div>
          <label className="font-semibold">
            Class Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Example: Zumba Fitness"
            value={formData.title}
            onChange={handleChange}
            className="border p-3 w-full rounded mt-2"
            required
          />
        </div>

        {/* ==============================
            Category
        ============================== */}

        <div>
          <label className="font-semibold">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-3 w-full rounded mt-2"
            required
          >
            <option value="">
              Select Category
            </option>

            <option value="yoga">
              Yoga
            </option>

            <option value="zumba">
              Zumba
            </option>

            <option value="cardio">
              Cardio
            </option>

            <option value="strength">
              Strength
            </option>
          </select>
        </div>

        {/* ==============================
            Description
        ============================== */}

        <div>
          <label className="font-semibold">
            Description
          </label>

          <textarea
            name="description"
            placeholder="Enter class description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="border p-3 w-full rounded mt-2"
            required
          />
        </div>

        {/* ==============================
            Date
        ============================== */}

        <div>
          <label className="font-semibold">
            Class Date
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-3 w-full rounded mt-2"
            required
          />
        </div>

        {/* ==============================
            Main Time
        ============================== */}

        <div>
          <label className="font-semibold">
            Class Time
          </label>

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border p-3 w-full rounded mt-2"
            required
          />
        </div>

        {/* ==============================
            AVAILABLE TIME SLOTS
        ============================== */}

        <div className="border rounded-xl p-5 bg-gray-50">

          <h2 className="text-xl font-bold">
            Available Time Slots
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Add the time slots that users can choose while booking.
          </p>

          <div className="flex gap-3 mt-4">

            <input
              type="time"
              value={slot}
              onChange={(e) =>
                setSlot(e.target.value)
              }
              className="border p-3 rounded flex-1 bg-white"
            />

            <button
              type="button"
              onClick={addSlot}
              className="bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700"
            >
              + Add Slot
            </button>

          </div>

          {/* Added Slots */}

          {formData.timeSlots.length > 0 && (

            <div className="mt-5">

              <p className="font-semibold mb-3">
                Added Slots:
              </p>

              <div className="flex flex-wrap gap-3">

                {formData.timeSlots.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-3 bg-blue-100 border border-blue-300 px-4 py-2 rounded-lg"
                    >

                      <span className="font-medium">
                        {item}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeSlot(item)
                        }
                        className="text-red-600 font-bold text-lg"
                      >
                        ×
                      </button>

                    </div>

                  )
                )}

              </div>

            </div>

          )}

        </div>

        {/* ==============================
            Duration
        ============================== */}

        <div>
          <label className="font-semibold">
            Duration (Minutes)
          </label>

          <input
            type="number"
            name="duration"
            placeholder="Example: 60"
            value={formData.duration}
            onChange={handleChange}
            className="border p-3 w-full rounded mt-2"
            min="1"
            required
          />
        </div>

        {/* ==============================
            Price
        ============================== */}

        <div>
          <label className="font-semibold">
            Price
          </label>

          <input
            type="number"
            name="price"
            placeholder="Example: 500"
            value={formData.price}
            onChange={handleChange}
            className="border p-3 w-full rounded mt-2"
            min="0"
            required
          />
        </div>

        {/* ==============================
            Seats
        ============================== */}

        <div>
          <label className="font-semibold">
            Available Seats
          </label>

          <input
            type="number"
            name="seats"
            placeholder="Example: 20"
            value={formData.seats}
            onChange={handleChange}
            className="border p-3 w-full rounded mt-2"
            min="1"
            required
          />
        </div>

        {/* ==============================
            Meeting Link
        ============================== */}

        <div>
          <label className="font-semibold">
            Meeting Link
          </label>

          <input
            type="url"
            name="meetingLink"
            placeholder="Google Meet / Zoom Link"
            value={formData.meetingLink}
            onChange={handleChange}
            className="border p-3 w-full rounded mt-2"
            required
          />

          <p className="text-sm text-gray-500 mt-2">
            Example:
            https://meet.google.com/abc-defg-hij
          </p>
        </div>

        {/* ==============================
            Submit
        ============================== */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Add Class
        </button>

      </form>

    </div>
  );
};

export default AddClass;