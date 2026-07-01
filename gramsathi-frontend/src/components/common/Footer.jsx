import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          <div>
            <h2 className="text-3xl font-bold text-white">🌾 GramSathi</h2>

            <p className="mt-5 leading-7 text-gray-400">
              India's trusted agricultural equipment rental platform connecting farmers with equipment owners.
            </p>

            <div className="flex gap-4 mt-8">
              <a href="#" className="w-11 h-11 rounded-full bg-gray-800 hover:bg-green-700 flex items-center justify-center transition">
                <FaFacebookF />
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-gray-800 hover:bg-green-700 flex items-center justify-center transition">
                <FaInstagram />
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-gray-800 hover:bg-green-700 flex items-center justify-center transition">
                <FaLinkedinIn />
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-gray-800 hover:bg-green-700 flex items-center justify-center transition">
                <FaGithub />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-green-400 transition">Home</Link></li>
              <li><Link to="/search" className="hover:text-green-400 transition">Browse Equipment</Link></li>
              <li><Link to="/register" className="hover:text-green-400 transition">Register</Link></li>
              <li><Link to="/login" className="hover:text-green-400 transition">Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6">Categories</h3>
            <ul className="space-y-4">
              <li>🚜 Tractor</li>
              <li>🌾 Harvester</li>
              <li>🚜 Rotavator</li>
              <li>💧 Water Pump</li>
              <li>🌱 Seeder</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
            <div className="space-y-5">
              <div className="flex gap-3 items-start">
                <FaMapMarkerAlt className="text-green-400 mt-1" />
                <p>IIIT Bhagalpur, Bihar, India</p>
              </div>
              <div className="flex gap-3 items-center">
                <FaPhoneAlt className="text-green-400" />
                <p>+91 9876543210</p>
              </div>
              <div className="flex gap-3 items-center">
                <FaEnvelope className="text-green-400" />
                <p>support@gramsathi.com</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-10 sm:my-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-center md:text-left">© 2026 GramSathi. All Rights Reserved.</p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
            <Link to="/" className="hover:text-green-400 transition">Privacy Policy</Link>
            <Link to="/" className="hover:text-green-400 transition">Terms & Conditions</Link>
            <Link to="/" className="hover:text-green-400 transition">Help Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;