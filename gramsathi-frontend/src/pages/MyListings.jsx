import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  getMyListings,
  deleteEquipment,
  toggleAvailability,
} from "../services/equipmentApi";

function MyListings() {
  const navigate = useNavigate();

  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const data = await getMyListings();
      setEquipments(data.equipments);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this equipment?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEquipment(id);

      setEquipments((prev) =>
        prev.filter((item) => item._id !== id)
      );

      alert("Equipment Deleted Successfully");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  const handleToggle = async (id) => {
    try {
      const response = await toggleAvailability(id);

      setEquipments((prev) =>
        prev.map((item) =>
          item._id === id ? response.equipment : item
        )
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Unable to update availability"
      );
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-screen-2xl mx-auto pt-32 pb-20 px-6 text-center">
          <h2 className="text-3xl font-bold text-green-700">
            Loading Equipments...
          </h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-screen-2xl mx-auto pt-32 pb-40 px-6">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-green-700">
            My Listings
          </h1>

          <p className="text-gray-600 mt-2">
            Manage all your agricultural equipment from one place.
          </p>
        </div>

        {equipments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <h2 className="text-3xl font-bold text-gray-700">
              No Equipment Found
            </h2>

            <p className="text-gray-500 mt-3">
              You haven't posted any equipment yet.
            </p>
          </div>
        ) : (
          <div
            className={
              equipments.length === 1
                ? "flex justify-center"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            }
          >
            {equipments.map((item) => (
              <div
                key={item._id}
                className={
                  equipments.length === 1
                    ? "w-full max-w-sm"
                    : ""
                }
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">

                  <img
                    src={item.images?.[0]?.url}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-6">

                    <h2 className="text-2xl font-bold text-gray-800">
                      {item.title}
                    </h2>

                    <p className="text-sm font-medium text-green-600 mt-1">
                      🚜 {item.category}
                    </p>

                    <p className="text-gray-600 mt-2">
                      📍 {item.location}, {item.state}
                    </p>

                    <p className="text-3xl font-bold text-green-700 mt-4">
                      ₹{item.pricePerDay}
                      <span className="text-lg font-medium text-gray-600">
                        {" "} / Day
                      </span>
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-3">

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          item.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.isActive
                          ? "🟢 Available"
                          : "🔴 Unavailable"}
                      </span>

                      <button
                        onClick={() => handleToggle(item._id)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                          item.isActive
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-green-600 hover:bg-green-700"
                        } text-white`}
                      >
                        {item.isActive
                          ? "Disable"
                          : "Enable"}
                      </button>

                    </div>

                    <div className="flex gap-3 mt-6">

                      <button
                        onClick={() =>
                          navigate(`/edit-equipment/${item._id}`)
                        }
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
                      >
                        🗑 Delete
                      </button>

                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default MyListings;