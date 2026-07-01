import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

function SearchFilter() {
  return (
    <section className="relative -mt-12 z-20">
      <div className="max-w-screen-xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">

            {/* Equipment */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-2">
                Equipment
              </label>

              <input
                type="text"
                placeholder="Tractor"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-2">
                Location
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3">

                <FaMapMarkerAlt className="text-green-700 mr-2" />

                <input
                  type="text"
                  placeholder="Patna"
                  className="w-full outline-none"
                />

              </div>
            </div>

            {/* Available From */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-2">
                Available From
              </label>

              <input
                type="date"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Available To */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-2">
                Available To
              </label>

              <input
                type="date"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-2">
                Category
              </label>

              <select className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600">

                <option>All Categories</option>
                <option>Tractor</option>
                <option>Harvester</option>
                <option>Rotavator</option>
                <option>Seeder</option>
                <option>Water Pump</option>

              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">

              <button className="w-full h-[50px] bg-green-700 hover:bg-green-800 text-white rounded-xl flex items-center justify-center gap-2 font-semibold transition duration-300 shadow-lg">

                <FaSearch />

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