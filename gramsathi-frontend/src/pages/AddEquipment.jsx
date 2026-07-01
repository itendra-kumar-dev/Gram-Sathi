import MainLayout from "../layouts/MainLayout";
import EquipmentForm from "../components/equipment/EquipmentForm";

function AddEquipment() {
  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-green-700">
              Add New Equipment
            </h1>

            <p className="text-gray-600 mt-2">
              Fill in the details below to list your equipment for rent.
            </p>
          </div>

          <EquipmentForm />

        </div>
      </div>
    </MainLayout>
  );
}

export default AddEquipment;