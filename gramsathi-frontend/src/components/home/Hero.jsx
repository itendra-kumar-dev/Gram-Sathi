import { Link } from "react-router-dom";
import hero from "../../assets/images/hero.png";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              🌾 India's Smart Agriculture Rental Platform
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 tracking-tight">
              Rent Farm Equipment
              <br />
              <span className="text-green-700">Near You</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 max-w-xl mx-auto lg:mx-0">
              Find tractors, harvesters, seeders, rotavators, water pumps and many more agricultural machines
              available for rent from trusted farmers nearby.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start flex-wrap gap-4 mt-8">
              <Link
                to="/search"
                className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white px-7 py-3.5 rounded-xl font-semibold transition duration-300 shadow-lg text-center"
              >
                Explore Equipment
              </Link>

              <Link
                to="/register"
                className="w-full sm:w-auto border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-7 py-3.5 rounded-xl font-semibold transition duration-300 text-center"
              >
                Become a Farmer
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 sm:mt-12">
              <div className="bg-white rounded-2xl shadow-md py-5 text-center border border-green-50">
                <h2 className="text-2xl font-bold text-green-700">500+</h2>
                <p className="text-sm text-gray-500 mt-1">Equipments</p>
              </div>

              <div className="bg-white rounded-2xl shadow-md py-5 text-center">
                <h2 className="text-2xl font-bold text-green-700">1200+</h2>
                <p className="text-sm text-gray-500 mt-1">Farmers</p>
              </div>

              <div className="bg-white rounded-2xl shadow-md py-5 text-center">
                <h2 className="text-2xl font-bold text-green-700">25+</h2>
                <p className="text-sm text-gray-500 mt-1">Cities</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={hero}
              alt="GramSathi Hero"
              className="w-full max-w-xl h-[280px] sm:h-[360px] object-cover rounded-[2rem] shadow-2xl border border-white/70"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;