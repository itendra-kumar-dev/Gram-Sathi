import EquipmentCard from "./EquipmentCard";
import { useEquipment } from "../../context/EquipmentContext";

const fallbackFeaturedEquipments = [
  {
    _id: "fallback-1",
    title: "John Deere Tractor",
    location: "Patna, Bihar",
    pricePerDay: 1800,
    rating: 4.8,
    isAvailable: true,
    images: [{ url: "https://images.unsplash.com/photo-1535131013032-37f0d6f6f0d0?auto=format&fit=crop&w=900&q=80" }],
  },
  {
    _id: "fallback-2",
    title: "Sugarcane Harvester",
    location: "Muzaffarpur, Bihar",
    pricePerDay: 2600,
    rating: 4.7,
    isAvailable: true,
    images: [{ url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80" }],
  },
  {
    _id: "fallback-3",
    title: "Power Weeder",
    location: "Gaya, Bihar",
    pricePerDay: 950,
    rating: 4.5,
    isAvailable: false,
    images: [{ url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80" }],
  },
  {
    _id: "fallback-4",
    title: "Water Pump Set",
    location: "Bhagalpur, Bihar",
    pricePerDay: 700,
    rating: 4.9,
    isAvailable: true,
    images: [{ url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80" }],
  },
  {
    _id: "fallback-5",
    title: "Seed Drill Machine",
    location: "Darbhanga, Bihar",
    pricePerDay: 1200,
    rating: 4.6,
    isAvailable: true,
    images: [{ url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80" }],
  },
  {
    _id: "fallback-6",
    title: "Rotavator Unit",
    location: "Sasaram, Bihar",
    pricePerDay: 1500,
    rating: 4.8,
    isAvailable: true,
    images: [{ url: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80" }],
  },
];

function EquipmentGrid() {
  const { equipments, loading, error } = useEquipment();
  const displayEquipments = (equipments.length > 0 ? equipments : fallbackFeaturedEquipments).slice(0, 6);

  return (
    <section className="py-18 sm:py-22 lg:py-26 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end mb-10 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Equipments</h2>
            <p className="text-gray-600 mt-2 sm:mt-3">
              Choose from the most popular agricultural equipment.
            </p>
          </div>

          <button className="text-green-700 font-semibold hover:underline text-left sm:text-right">
            View All →
          </button>
        </div>

        {loading && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-green-700">Loading Equipments...</h2>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-16">
            <h2 className="text-2xl text-red-600">{error}</h2>
          </div>
        )}

        {!loading && !error && (
          <>
            {displayEquipments.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {displayEquipments.map((equipment) => (
                  <EquipmentCard key={equipment._id} equipment={equipment} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-700">No Equipments Available</h2>
                <p className="text-gray-500 mt-3">Farmers haven't added any equipment yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default EquipmentGrid;