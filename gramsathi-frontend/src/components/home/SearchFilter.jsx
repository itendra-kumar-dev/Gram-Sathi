import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

function SearchFilter() {
  return (
    <section className="py-10 sm:py-12 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.12)] border border-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4 sm:gap-6">
            <div className="sm:col-span-2 xl:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Equipment
              </label>

              <div className="flex items-center border rounded-xl px-4 h-14">
                <FaSearch className="text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search equipment..."
                  className="w-full outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>

              <div className="flex items-center border rounded-xl px-4 h-14">
                <FaMapMarkerAlt className="text-green-700 mr-3" />
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Available From
              </label>

              <input type="date" className="w-full border rounded-xl px-4 h-14 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Available To
              </label>

              <input type="date" className="w-full border rounded-xl px-4 h-14 outline-none" />
            </div>

            <div className="flex items-end sm:col-span-2 xl:col-span-1">
              <button className="w-full h-14 bg-green-700 hover:bg-green-800 text-white rounded-xl font-semibold transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchFilter;