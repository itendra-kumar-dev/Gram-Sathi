import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import EquipmentForm from "../components/equipment/EquipmentForm";

import { getEquipmentById } from "../services/equipmentApi";

function EditEquipment() {

  const { id } = useParams();

  const [equipment, setEquipment] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchEquipment = async () => {

      try {

        const data = await getEquipmentById(id);

        setEquipment(data.equipment);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchEquipment();

  }, [id]);

  if (loading) {

    return (
      <MainLayout>

        <div className="max-w-6xl mx-auto pt-28 pb-16 px-6">

          <h2 className="text-3xl font-bold text-green-700">
            Loading Equipment...
          </h2>

        </div>

      </MainLayout>
    );

  }

  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto pt-28 pb-20 px-6">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-green-700">
            Edit Equipment
          </h1>

          <p className="text-gray-600 mt-2">
            Update your equipment information.
          </p>

        </div>

        <EquipmentForm
          editMode={true}
          equipment={equipment}
        />

      </div>

    </MainLayout>

  );

}

export default EditEquipment;