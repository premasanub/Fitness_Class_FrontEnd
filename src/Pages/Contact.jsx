
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col gap-12">

      {/* Heading */}
      <section className="w-full max-w-6xl self-center flex flex-col items-center gap-4 text-center min-h-40 justify-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Contact <span className="text-blue-600">Us</span>
        </h1>

        <p className="text-gray-600">
          Have questions? We would love to hear from you.
        </p>
      </section>

      <section className="w-full max-w-6xl self-center">
        <div className="w-[92%] self-center grid md:grid-cols-2 gap-10">

          {/* Contact Information */}
          <div className="bg-black text-white rounded-2xl min-h-96 flex flex-col justify-center gap-8">
            <div className="w-[88%] self-center flex flex-col gap-8">

              <h2 className="text-3xl font-bold">
                Get In Touch
              </h2>

              <div className="flex flex-col gap-7">

                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-blue-500 text-2xl shrink-0" />

                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-300">
                      support@fitbook.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FaPhone className="text-blue-500 text-2xl shrink-0" />

                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-300">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-blue-500 text-2xl shrink-0" />

                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-300">
                      Chennai, Tamil Nadu, India
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg min-h-96 flex flex-col justify-center gap-6">
            <div className="w-[88%] self-center flex flex-col gap-6">

              <h2 className="text-3xl font-bold">
                Send Us a Message
              </h2>

              <form className="flex flex-col gap-5">

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="font-semibold"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full h-12 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 indent-3"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="font-semibold"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-12 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 indent-3"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="font-semibold"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Enter your message"
                    className="w-full border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 indent-3"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-12 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
                >
                  Send Message
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Contact;
