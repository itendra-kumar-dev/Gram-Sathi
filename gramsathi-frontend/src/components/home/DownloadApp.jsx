import { FaGooglePlay, FaApple } from "react-icons/fa";

function DownloadApp() {
  return (
    <section className="py-20 sm:py-24 bg-green-700 text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Left Content */}
          <div>

            <span className="inline-flex bg-green-600 px-4 py-2 rounded-full text-sm font-semibold">
              📱 Mobile App
            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-bold leading-tight">
              Download the
              <br />
              GramSathi App
            </h2>

            <p className="mt-5 text-base lg:text-lg leading-7 text-green-100 max-w-md">
              Book tractors, harvesters, seeders, rotavators and many more
              farming equipments directly from your mobile phone.
            </p>

            {/* Store Buttons */}

            <div className="mt-8 flex flex-wrap gap-4">

              <button className="flex items-center gap-3 bg-white text-green-700 px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition">

                <FaGooglePlay size={22} />

                <div className="text-left">
                  <p className="text-[8px] uppercase">
                    Get it on
                  </p>

                  <h4 className="text-sm font-bold">
                    Google Play
                  </h4>
                </div>

              </button>

              <button className="flex items-center gap-3 bg-white text-green-700 px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition">

                <FaApple size={22} />

                <div className="text-left">
                  <p className="text-[8px] uppercase">
                    Download on the
                  </p>

                  <h4 className="text-sm font-bold">
                    App Store
                  </h4>
                </div>

              </button>

            </div>

          </div>

          {/* Right Image */}

          <div className="flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900"
              alt="GramSathi Mobile App"
              className="w-full max-w-xs lg:max-w-sm rounded-[2rem] shadow-2xl border border-green-600/40"
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default DownloadApp;