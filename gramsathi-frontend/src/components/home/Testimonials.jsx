import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Ramesh Kumar",
    city: "Patna, Bihar",
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "GramSathi helped me rent a tractor during the harvesting season. The booking process was smooth and affordable.",
  },
  {
    id: 2,
    name: "Sunita Devi",
    city: "Varanasi, UP",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Very useful platform. I rented a water pump within minutes. Highly recommended for every farmer.",
  },
  {
    id: 3,
    name: "Aman Singh",
    city: "Ranchi, Jharkhand",
    image:
      "https://randomuser.me/api/portraits/men/61.jpg",
    review:
      "Affordable prices and verified equipment owners. I will definitely use GramSathi again.",
  },
];

function Testimonials() {
  return (
    <section className="py-20 sm:py-24 bg-white">

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">

        {/* Heading */}

        <div className="text-center mb-12 sm:mb-16">

          <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-semibold">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
            What Our Farmers Say
          </h2>

          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
            Thousands of farmers trust GramSathi for renting
            agricultural equipment safely and affordably.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="bg-gray-50 rounded-[1.5rem] p-7 sm:p-8 shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
            >

              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>

                  <h3 className="text-xl font-bold">
                    {item.name}
                  </h3>

                  <p className="text-gray-500">
                    {item.city}
                  </p>

                </div>

              </div>

              <div className="flex gap-1 text-yellow-500 mt-6">

                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

              </div>

              <p className="mt-6 text-gray-600 leading-8 italic">
                "{item.review}"
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;