import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white w-full">

      <div className="w-[92%] max-w-7xl mx-auto grid md:grid-cols-3 gap-10 min-h-64 items-center">

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-blue-500">
            FitBook
          </h1>

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
            <li className="hover:text-white transition cursor-pointer">
              Home
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Classes
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Trainers
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Contact
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
      <div className="w-[92%] max-w-7xl mx-auto border-t border-gray-700" />

      {/* Copyright */}
      <div className="w-full min-h-16 flex items-center justify-center">
        <p className="text-center text-gray-400 text-sm">
          © 2026 FitBook. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;