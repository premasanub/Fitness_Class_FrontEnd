import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white w-full py-12">

      <div className="w-[92%] max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="text-3xl font-bold text-blue-500 hover:text-blue-400 transition"
          >
            FitBook
          </Link>

          <p className="text-gray-400 leading-relaxed max-w-md">
            Book fitness classes and certified trainers
            anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">
            Quick Links
          </h2>

          <ul className="flex flex-col gap-2 text-gray-400">

            <li>
              <Link
                to="/"
                className="hover:text-white transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/classes"
                className="hover:text-white transition"
              >
                Classes
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/trainers"
                className="hover:text-white transition"
              >
                Trainers
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-white transition"
              >
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-4">

          <h2 className="text-xl font-bold">
            Follow Us
          </h2>

          <div className="flex items-center gap-5 text-2xl text-gray-300">

            <FaFacebook className="hover:text-blue-500 transition cursor-pointer" />

            <FaInstagram className="hover:text-pink-500 transition cursor-pointer" />

            <FaTwitter className="hover:text-sky-400 transition cursor-pointer" />

            <FaYoutube className="hover:text-red-500 transition cursor-pointer" />

          </div>

        </div>

      </div>

      {/* Divider */}
      <hr className="w-[92%] max-w-7xl mx-auto my-8 border-gray-700" />

      {/* Copyright */}
      <p className="text-center text-gray-400 px-4">
        © 2026 FitBook. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;