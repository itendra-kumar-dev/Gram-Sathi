function Hero() {
  return (
    <section className="bg-gradient-to-r from-white to-green-50">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center min-h-[80vh] px-8">

        <div>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
            AI Powered Agriculture Platform
          </span>

          <h1 className="text-6xl font-bold mt-8">
            Rent Smart.
            <br />

            <span className="text-green-600">
              Farm Better.
            </span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Connect farmers with equipment
            owners. Rent tractors,
            harvesters and tools instantly.
          </p>

          <div className="flex gap-5 mt-8">

            <button className="bg-green-600 text-white px-8 py-4 rounded-xl">
              Explore Equipment
            </button>

            <button className="border px-8 py-4 rounded-xl">
              How It Works
            </button>

          </div>

        </div>

        <div className="flex justify-center">

          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854"
            alt="tractor"
            className="rounded-3xl shadow-xl"
          />

        </div>

      </div>

    </section>
  );
}

export default Hero;