import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Heading */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            Contact Us
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto leading-7">
            Have questions or need assistance? We are here to help you.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-14 lg:pb-20">
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-10">
          {/* Contact Info */}
          <div className="bg-black text-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Get In Touch
            </h2>

            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-blue-400 text-xl mt-1 shrink-0" />

                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-300">
                    support@fitbook.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaPhone className="text-blue-400 text-xl mt-1 shrink-0" />

                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-gray-300">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-blue-400 text-xl mt-1 shrink-0" />

                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-gray-300 leading-6">
                    Chennai, Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Send Us a Message
            </h2>

            <form className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Enter your message"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;