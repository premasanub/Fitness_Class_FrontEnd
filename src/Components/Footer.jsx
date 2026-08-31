import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white m-0 p-0">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 m-0 p-0">

        <div className="m-0 p-0">
          <h1 className="text-3xl font-bold text-blue-500 m-0 p-0">
            FitBook
          </h1>

          <p className="text-gray-400 m-0 p-0">
            Book fitness classes and certified trainers anytime, anywhere.
          </p>
        </div>

        <div className="m-0 p-0">
          <h2 className="text-xl font-bold m-0 p-0">
            Quick Links
          </h2>

          <ul className="text-gray-400 m-0 p-0">
            <li className="m-0 p-0">Home</li>
            <li className="m-0 p-0">Classes</li>
            <li className="m-0 p-0">Trainers</li>
            <li className="m-0 p-0">Contact</li>
          </ul>
        </div>

        <div className="m-0 p-0">

          <h2 className="text-xl font-bold m-0 p-0">
            Follow Us
          </h2>

          <div className="flex text-2xl m-0 p-0">
            <FaFacebook className="m-0 p-0" />
            <FaInstagram className="m-0 p-0" />
            <FaTwitter className="m-0 p-0" />
            <FaYoutube className="m-0 p-0" />
          </div>

        </div>

      </div>

      <hr className="border-gray-700 m-0 p-0" />

      <p className="text-center text-gray-400 m-0 p-0">
        © 2026 FitBook. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;
