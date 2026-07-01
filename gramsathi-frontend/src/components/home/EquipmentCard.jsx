import { FaHeart, FaMapMarkerAlt, FaStar } from "react-icons/fa";

function EquipmentCard({ equipment }) {
  return (
    <div className="bg-white rounded-[1.5rem] shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={
            equipment.images?.length > 0
              ? equipment.images[0].url
              : "https://via.placeholder.com/600x400?text=No+Image"
          }
          alt={equipment.title}
          className="w-full h-56 sm:h-60 object-cover group-hover:scale-105 transition duration-500"
        />

        <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition">
          <FaHeart />
        </button>

        <span
          className={`absolute bottom-4 left-4 px-4 py-2 rounded-full text-sm font-semibold text-white ${
            equipment.isAvailable ? "bg-green-700" : "bg-red-600"
          }`}
        >
          {equipment.isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-lg sm:text-xl font-bold">{equipment.title}</h3>

          <div className="flex items-center gap-1 text-yellow-500 shrink-0">
            <FaStar />
            <span className="font-semibold">{equipment.rating?.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500 mt-3 text-sm sm:text-base">
          <FaMapMarkerAlt />
          {equipment.location}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-green-700">₹{equipment.pricePerDay}</span>
            <span className="text-gray-500">/day</span>
          </div>

          <button className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl font-semibold transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default EquipmentCard;