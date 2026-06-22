function Features() {
  return (
    <section className="bg-gray-50 py-20">

      <h2 className="text-5xl text-center font-bold mb-12">
        Why Choose GramSathi
      </h2>

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-8">

        <div className="bg-white p-8 rounded-xl shadow">
          <h3 className="font-bold text-xl">
            Verified Equipment
          </h3>
        </div>

        <div className="bg-white p-8 rounded-xl shadow">
          <h3 className="font-bold text-xl">
            Affordable Pricing
          </h3>
        </div>

        <div className="bg-white p-8 rounded-xl shadow">
          <h3 className="font-bold text-xl">
            Fast Booking
          </h3>
        </div>

        <div className="bg-white p-8 rounded-xl shadow">
          <h3 className="font-bold text-xl">
            AI Recommendations
          </h3>
        </div>

      </div>

    </section>
  );
}

export default Features;