import { createContext, useContext, useEffect, useState } from "react";
import { getEquipments } from "../services/equipmentApi";

const EquipmentContext = createContext();

export const EquipmentProvider = ({ children }) => {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===============================
  // Fetch All Equipments
  // ===============================
  const fetchEquipments = async (filters = {}) => {
    try {
      setLoading(true);
      setError("");

      const data = await getEquipments(filters);

      setEquipments(data.equipments || []);
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Unable to fetch equipments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  return (
    <EquipmentContext.Provider
      value={{
        equipments,
        loading,
        error,
        fetchEquipments,
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = () => {
  return useContext(EquipmentContext);
};