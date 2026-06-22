function Stats() {
  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 py-16 px-8">

      <div className="bg-white shadow-lg p-6 rounded-xl text-center">
        <h2 className="text-3xl font-bold text-green-600">
          500+
        </h2>
        <p>Happy Farmers</p>
      </div>

      <div className="bg-white shadow-lg p-6 rounded-xl text-center">
        <h2 className="text-3xl font-bold text-green-600">
          120+
        </h2>
        <p>Equipments</p>
      </div>

      <div className="bg-white shadow-lg p-6 rounded-xl text-center">
        <h2 className="text-3xl font-bold text-green-600">
          50+
        </h2>
        <p>Locations</p>
      </div>

      <div className="bg-white shadow-lg p-6 rounded-xl text-center">
        <h2 className="text-3xl font-bold text-green-600">
          4.8
        </h2>
        <p>Rating</p>
      </div>

    </div>
  );
}

export default Stats;