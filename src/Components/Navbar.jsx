import { FaDumbbell } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white px-10 py-4 flex justify-between items-center">

      <div className="flex items-center gap-2">
        <FaDumbbell className="text-blue-500 text-3xl" />
        <h1 className="text-3xl font-bold">
          Fit<span className="text-blue-500">Book</span>
        </h1>
      </div>

      <ul className="hidden md:flex gap-8">
        <li className="cursor-pointer hover:text-blue-500">Home</li>
        <li className="cursor-pointer hover:text-blue-500">Classes</li>
        <li className="cursor-pointer hover:text-blue-500">Trainers</li>
        <li className="cursor-pointer hover:text-blue-500">About</li>
        <li className="cursor-pointer hover:text-blue-500">Contact</li>
      </ul>
      
      <Link to="/login">
<button className="border border-white px-5 py-2 rounded-lg">
Login
</button>
</Link>

<Link to="/register">
<button className="bg-blue-600 px-5 py-2 rounded-lg">
Register
</button>
</Link>
    </nav>
  );
}

export default Navbar;