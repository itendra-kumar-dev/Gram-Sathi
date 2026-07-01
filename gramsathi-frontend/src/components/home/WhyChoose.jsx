import {
  FaShieldAlt,
  FaCreditCard,
  FaCalendarCheck,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt size={34} />,
    title: "Trusted Community",
    description: "Verified farmers and equipment owners.",
  },
  {
    icon: <FaCreditCard size={34} />,
    title: "Secure Payments",
    description: "100% secure online transactions.",
  },
  {
    icon: <FaCalendarCheck size={34} />,
    title: "Easy Booking",
    description: "Book equipment in just a few clicks.",
  },
  {
    icon: <FaHeadset size={34} />,
    title: "24/7 Support",
    description: "Our support team is always here to help.",
  },
];

function WhyChoose() {
  return (
    <section className="py-20 sm:py-24 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-12 sm:mb-16">

          <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-semibold">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900">
            Why Farmers Love GramSathi
          </h2>

          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
            We make renting agricultural equipment simple,
            secure and affordable for everyone.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-[1.5rem] shadow-md hover:shadow-xl transition duration-300 p-7 sm:p-8 text-center hover:-translate-y-2 border border-gray-100"
            >

              <div className="w-20 h-20 mx-auto rounded-full bg-green-100 text-green-700 flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChoose;