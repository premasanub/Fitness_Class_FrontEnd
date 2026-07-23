import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white py-12">

      <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-3 gap-10">

        <div>
          <h1 className="text-3xl font-bold text-blue-500">
            FitBook
          </h1>

          <p className="mt-4 text-gray-400">
            Book fitness classes and certified trainers
            anytime, anywhere.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">
            Quick Links
          </h2>

          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Classes</li>
            <li>Trainers</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>

          <h2 className="text-xl font-bold mb-4">
            Follow Us
          </h2>

          <div className="flex gap-5 text-2xl">

            <FaFacebook />

            <FaInstagram />

            <FaTwitter />

            <FaYoutube />

          </div>

        </div>

      </div>

      <hr className="my-8 border-gray-700" />

      <p className="text-center text-gray-400">
        © 2026 FitBook. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;