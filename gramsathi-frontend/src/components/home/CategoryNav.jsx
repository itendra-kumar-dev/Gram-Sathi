import {
  FaTractor,
  FaTruck,
  FaTint,
  FaSeedling,
  FaThLarge,
} from "react-icons/fa";
import { GiFarmTractor, GiWheat } from "react-icons/gi";

const categories = [
  {
    name: "All Categories",
    icon: <FaThLarge size={24} />,
    highlight: true,
  },
  {
    name: "Tractor",
    icon: <FaTractor size={24} />,
  },
  {
    name: "Harvester",
    icon: <GiWheat size={24} />,
  },
  {
    name: "Rotavator",
    icon: <GiFarmTractor size={24} />,
  },
  {
    name: "Water Pump",
    icon: <FaTint size={24} />,
  },
  {
    name: "Trailer",
    icon: <FaTruck size={24} />,
  },
  {
    name: "Seeder",
    icon: <FaSeedling size={24} />,
  },
  {
    name: "More",
    icon: <span className="text-2xl font-bold">•••</span>,
  },
];

function CategoryNav() {
  return (
    <section className="py-10 sm:py-12 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5">

          {categories.map((category) => (
            <button
              key={category.name}
              className={`h-28 sm:h-32 rounded-[1.25rem] border transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1
              flex flex-col items-center justify-center
              ${
                category.highlight
                  ? "bg-green-700 text-white border-green-700"
                  : "bg-white border-gray-200 hover:bg-green-50"
              }`}
            >
              <div className="mb-3">
                {category.icon}
              </div>

              <span className="font-semibold text-sm text-center">
                {category.name}
              </span>
            </button>
          ))}

        </div>

      </div>
    </section>
  );
}

export default CategoryNav;