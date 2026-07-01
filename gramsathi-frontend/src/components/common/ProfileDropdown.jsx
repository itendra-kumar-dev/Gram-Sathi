import { Link } from "react-router-dom";
import {
  FaUser,
  FaTractor,
  FaClipboardList,
  FaHeart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function ProfileDropdown({ user, logout }) {
  return (
    <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">

      {/* User Info */}
      <div className="px-5 py-4 bg-green-700 text-white">
        <h3 className="font-bold text-lg">
          {user?.name}
        </h3>

        <p className="text-sm text-green-100">
          {user?.email}
        </p>
      </div>

      {/* Menu */}
      <div className="py-2">

        <Link
          to="/profile"
          className="flex items-center gap-3 px-5 py-3 hover:bg-green-50 transition"
        >
          <FaUser className="text-green-700" />
          <span>My Profile</span>
        </Link>

        <Link
          to="/my-listings"
          className="flex items-center gap-3 px-5 py-3 hover:bg-green-50 transition"
        >
          <FaTractor className="text-green-700" />
          <span>My Listings</span>
        </Link>

        <Link
          to="/my-bookings"
          className="flex items-center gap-3 px-5 py-3 hover:bg-green-50 transition"
        >
          <FaClipboardList className="text-green-700" />
          <span>My Bookings</span>
        </Link>

        <Link
          to="/wishlist"
          className="flex items-center gap-3 px-5 py-3 hover:bg-green-50 transition"
        >
          <FaHeart className="text-green-700" />
          <span>Wishlist</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 px-5 py-3 hover:bg-green-50 transition"
        >
          <FaCog className="text-green-700" />
          <span>Settings</span>
        </Link>

        <hr className="my-2" />

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 transition"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>
    </div>
  );
}

export default ProfileDropdown;