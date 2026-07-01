import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "./FormInput";
import ImageUpload from "./ImageUpload";

import {
  addEquipment,
  updateEquipment,
} from "../../services/equipmentApi";

function EquipmentForm({
  editMode = false,
  equipment = null,
}) {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    pricePerDay: "",
    securityDeposit: "",
    location: "",
    district: "",
    state: "",
    availableFrom: "",
    availableTo: "",
    availableTimeStart: "",
    availableTimeEnd: "",
  });

  // ==========================
  // Load Data In Edit Mode
  // ==========================

  useEffect(() => {

    if (editMode && equipment) {

      setFormData({
        title: equipment.title || "",
        description: equipment.description || "",
        category: equipment.category || "",
        brand: equipment.brand || "",
        pricePerDay: equipment.pricePerDay || "",
        securityDeposit: equipment.securityDeposit || "",
        location: equipment.location || "",
        district: equipment.district || "",
        state: equipment.state || "",
        availableFrom: equipment.availableFrom
          ? equipment.availableFrom.substring(0, 10)
          : "",
        availableTo: equipment.availableTo
          ? equipment.availableTo.substring(0, 10)
          : "",
        availableTimeStart: equipment.availableTimeStart || "",
        availableTimeEnd: equipment.availableTimeEnd || "",
      });

    }

  }, [editMode, equipment]);

  // ==========================
  // Handle Change
  // ==========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ==========================
  // Handle Submit
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      images.forEach((image) => {
        data.append("images", image);
      });

      let response;

      if (editMode) {

        response = await updateEquipment(
          equipment._id,
          data
        );

      } else {

        response = await addEquipment(data);

      }

      setSuccess(response.message);

      setTimeout(() => {
        navigate("/my-listings");
      }, 1500);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Operation Failed"
      );

    } finally {

      setLoading(false);

    }

  };
    return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 space-y-8"
    >
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 p-4 rounded-xl">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <FormInput
          label="Equipment Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Mahindra Tractor"
          required
        />

        <FormInput
          label="Brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Mahindra"
          required
        />

        <div className="md:col-span-2">
          <label className="block mb-2 font-medium text-gray-700">
            Description
          </label>

          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write equipment description..."
            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-600"
            required
          >
            <option value="">Select Category</option>
            <option>Tractor</option>
            <option>Harvester</option>
            <option>Rotavator</option>
            <option>Power Weeder</option>
            <option>Seed Drill</option>
            <option>Sprayer</option>
            <option>Water Pump</option>
            <option>Other</option>
          </select>
        </div>

        <FormInput
          label="Price Per Day (₹)"
          name="pricePerDay"
          type="number"
          value={formData.pricePerDay}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Security Deposit (₹)"
          name="securityDeposit"
          type="number"
          value={formData.securityDeposit}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <FormInput
          label="District"
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
        />

        <FormInput
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Available From"
          name="availableFrom"
          type="date"
          value={formData.availableFrom}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Available To"
          name="availableTo"
          type="date"
          value={formData.availableTo}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Start Time"
          name="availableTimeStart"
          type="time"
          value={formData.availableTimeStart}
          onChange={handleChange}
          required
        />

        <FormInput
          label="End Time"
          name="availableTimeEnd"
          type="time"
          value={formData.availableTimeEnd}
          onChange={handleChange}
          required
        />

      </div>

      <ImageUpload
        images={images}
        setImages={setImages}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl text-lg font-semibold transition disabled:opacity-50"
      >
        {loading
          ? editMode
            ? "Updating Equipment..."
            : "Adding Equipment..."
          : editMode
          ? "Update Equipment"
          : "Add Equipment"}
      </button>
    </form>
  );
}

export default EquipmentForm;