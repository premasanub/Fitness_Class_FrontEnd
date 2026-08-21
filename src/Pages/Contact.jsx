import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold">
            Contact <span className="text-blue-600">Us</span>
          </h1>

          <p className="text-gray-600 mt-4">
            Have questions? We would love to hear from you.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Information */}
          <div className="bg-black text-white rounded-2xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Get In Touch
            </h2>

            <div className="space-y-7">

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-blue-500 text-2xl" />

                <div>
                  <p className="font-semibold">
                    Email
                  </p>

                  <p className="text-gray-300">
                    support@fitbook.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaPhone className="text-blue-500 text-2xl" />

                <div>
                  <p className="font-semibold">
                    Phone
                  </p>

                  <p className="text-gray-300">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-blue-500 text-2xl" />

                <div>
                  <p className="font-semibold">
                    Location
                  </p>

                  <p className="text-gray-300">
                    Chennai, Tamil Nadu, India
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-3xl font-bold mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-5">

              <div>
                <label className="block font-semibold mb-2">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Enter your message"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Contact;