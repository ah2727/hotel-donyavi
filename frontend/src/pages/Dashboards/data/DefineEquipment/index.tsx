import React, { useState, useEffect } from "react";
import axios from "axios";

type DeviceType = {
  id: number;
  name: string;
  brand: string;
  model: string;
  serialNumber?: string;
  purchaseDate?: string;
  status: "active" | "inactive" | "retired";
};

type EquipmentType = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type EquipmentFormData = {
  id?: number; // Optional for new equipment (not required on creation)
  name: string;
  serialNumber: string;
  purchaseDate?: string; // Date as an ISO string
  equipmentTypeId?: number; // Foreign key for EquipmentType
  selectedDevices: number[]; // Array of device IDs (for multiple selection)
};

const DefinEquipment = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [devices, setDevices] = useState<DeviceType[]>([]);
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EquipmentFormData>({
    name: "",
    serialNumber: "",
    purchaseDate: "",
    equipmentTypeId: undefined,
    selectedDevices: [], // Store selected devices here
  });

  // Fetch devices from API
  const fetchDevice = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<DeviceType[]>(`${API_URL}/device/`);
      setDevices(response.data);
    } catch (err) {
      console.error("Error fetching devices:", err);
      setError("Failed to fetch devices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch equipment types from API
  const fetchEquipmentType = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<EquipmentType[]>(
        `${API_URL}/equipment/equipment-types`
      );
      setEquipmentTypes(response.data);
    } catch (err) {
      console.error("Error fetching equipment types:", err);
      setError("Failed to fetch equipment types. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDevice();
    fetchEquipmentType();
  }, []);

  // Handle form field changes (including multi-select for devices)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Handle multiple device selection
    if (name === "selectedDevices") {
      const selectedOptions = Array.from(
        (e.target as HTMLSelectElement).selectedOptions
      ).map((option) => parseInt(option.value));
      setFormData((prevState) => ({
        ...prevState,
        selectedDevices: selectedOptions,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: name === "equipmentTypeId" ? parseInt(value) || undefined : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData);
      // Here you can send `formData` to your API
      await axios.post(`${API_URL}/equipment/equipment`, formData);
      alert("Equipment successfully created!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create equipment. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <div className="card mt-10">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col items-center">
              <div className="flex flex-col items-start">
                <label className="inline-block mb-2 text-base font-medium">
                  نام دستگاه:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col items-center">
              <div className="flex flex-col items-start">
                <label className="inline-block mb-2 text-base font-medium">
                  سریال نامبر:
                </label>
                <input
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col items-center">
              <div className="flex flex-col items-start">
                <label className="inline-block mb-2 text-base font-medium">
                  تاریخ تاسیس:
                </label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate || ""}
                  onChange={handleChange}
                  className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col items-center">
              <div className="flex flex-col items-start">
                <label className="inline-block mb-2 text-base font-medium">
                  نوع تجهیزات:
                </label>
                <select
                  className="form-select  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  name="equipmentTypeId"
                  value={formData.equipmentTypeId || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    انتخاب کنید
                  </option>
                  {equipmentTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4 flex flex-col items-center">
              <div className="flex flex-col items-start">
                <label className="inline-block mb-2 text-base font-medium">
                  نوع دستگاه:
                </label>
                <select
                  multiple
                  name="selectedDevices"
                  value={formData.selectedDevices.map(String)} // Convert to string for the `value` attribute
                  onChange={handleChange}
                  className="form-select  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                >
                  {devices.map((device) => (
                    <option key={device.id} value={device.id}>
                      {device.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4 flex flex-col items-center">
              <button
                type="submit"
                className="text-white btn bg-custom-500 hover:bg-custom-600"
              >
                تایید
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DefinEquipment;
