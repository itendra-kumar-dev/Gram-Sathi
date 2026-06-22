import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        <h1 className="text-3xl font-bold text-green-700">
          🚜 GramSathi
        </h1>

        <div className="flex gap-8 font-medium">
          <Link to="/">Home</Link>
          <Link to="/">Equipments</Link>
          <Link to="/">AI Assistant</Link>
          <Link to="/">About</Link>
        </div>

        <div className="flex gap-4">

          <button className="border border-green-600 px-5 py-2 rounded-lg">
            Login
          </button>

          <button className="bg-green-600 text-white px-5 py-2 rounded-lg">
            Register
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;