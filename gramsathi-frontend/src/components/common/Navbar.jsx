import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

import {
  FaMapMarkerAlt,
  FaSearch,
  FaHeart,
  FaBell,
  FaUserCircle,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { BiMessageRounded } from "react-icons/bi";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout, isAuthenticated } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 lg:py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link to="/" className="flex items-center gap-2 min-w-0">
              <span className="text-3xl sm:text-4xl">🌾</span>

              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-green-700 leading-tight">
                  GramSathi
                </h1>
                <p className="text-xs text-gray-500">Rent. Connect. Grow.</p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden rounded-lg border border-gray-200 p-2.5 text-gray-700"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>

          <div className="hidden lg:flex flex-1 items-center gap-4 ml-4 xl:ml-8">
            <div className="flex items-center border rounded-xl h-12 px-4 w-56">
              <FaMapMarkerAlt className="text-green-700 mr-2" />
              <select className="w-full outline-none bg-transparent">
                <option>Patna, Bihar</option>
                <option>Delhi</option>
                <option>Lucknow</option>
                <option>Kolkata</option>
              </select>
            </div>

            <div className="flex w-[430px] max-w-full">
              <input
                type="text"
                placeholder="Search tractor, harvester..."
                className="w-full h-12 border border-r-0 rounded-l-xl px-5 outline-none"
              />
              <button className="w-14 bg-green-700 hover:bg-green-800 text-white rounded-r-xl flex items-center justify-center">
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 xl:gap-7 relative">
            <button className="hidden xl:flex flex-col items-center text-sm hover:text-green-700 transition relative">
              <FaHeart size={18} />
              <span className="text-xs mt-1">Wishlist</span>
            </button>

            <button className="hidden xl:flex flex-col items-center text-sm hover:text-green-700 transition relative">
              <BiMessageRounded size={22} />
              <span className="absolute -top-1 -right-2 bg-green-700 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                2
              </span>
              <span className="text-xs mt-1">Messages</span>
            </button>

            <button className="hidden xl:flex flex-col items-center text-sm hover:text-green-700 transition relative">
              <FaBell size={18} />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                5
              </span>
              <span className="text-xs mt-1">Alerts</span>
            </button>

            <Link
              to="/add-equipment"
              className="bg-green-700 hover:bg-green-800 text-white px-4 xl:px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition"
            >
              + Post Equipment
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-xl transition"
                >
                  <FaUserCircle size={42} className="text-green-700" />

                  <div className="hidden lg:block text-left">
                    <h3 className="font-semibold text-gray-800">{user?.name}</h3>
                    <p className="text-xs text-gray-500">Farmer</p>
                  </div>

                  <FaChevronDown
                    className={`text-gray-500 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {showDropdown && <ProfileDropdown user={user} logout={handleLogout} />}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="font-semibold hover:text-green-700 transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-700 hover:bg-green-800 text-white px-4 py-3 rounded-xl font-semibold transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-3 border-t border-gray-100 pt-3 pb-2 space-y-3">
            <div className="flex items-center border rounded-xl h-12 px-3">
              <FaSearch className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search equipment"
                className="w-full outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-gray-700">
                Home
              </Link>
              <Link to="/search" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-gray-700">
                Browse
              </Link>
              <Link to="/add-equipment" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-green-700">
                Post Equipment
              </Link>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2">
                <div>
                  <p className="font-semibold text-gray-800">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <button onClick={handleLogout} className="text-sm font-semibold text-red-600">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-green-700">
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-green-700">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;