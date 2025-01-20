import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from "Common/DeleteModal";

type Device = {
  id: number;
  name: string;
  brand: string;
  model: string;
  serialNumber?: string;
  purchaseDate?: string;
  status: "active" | "inactive" | "retired";
};

type Equipment = {
  id: number;
  name: string;
  serialNumber: string;
  purchaseDate?: string;
  equipmentTypeId?: number;
  createdAt: string;
  updatedAt: string;
  devices: Device[]; // Associated devices
};
interface Place {
  id: number;
  name: string;
  description: string;
  address: string;
}
export type DeployedEquipment = {
  id: number; // Primary key
  status: "active" | "inactive" | "maintenance"; // Restrict to valid options
  deploymentDate: string; // ISO format string
  equipmentId: string; // Foreign key to Equipment
  placeId: string; // Foreign key to Place
  equipment?: Equipment; // Associated Equipment object (optional, for eager loading)
  place?: Place; // Associated Place object (optional, for eager loading)
};
const DEquipment = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [equipment, setEquipmnet] = useState<Equipment[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [notification, setNotification] = useState(""); // State to store the notification message
  const [selectedId, setSelectedId] = useState<number | null>(null); // Track the selected id
  const [DEquipment, setDEquipment] = useState<DeployedEquipment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const [formData, setFormData] = useState({
    equipmentId: "",
    placeId: "",
    status: "active",
    deploymentDate: "",
  });
  const fetchEquipment = async () => {
    try {
      // Fetch equipment data from the API
      const response = await axios.get(`${API_URL}/equipment/equipment`);
      setEquipmnet(response.data);
    } catch (error) {
      console.error("Error fetching equipment data:", error);
    } finally {
    }
  };
  const fetchPlaces = async () => {
    try {
      // Fetch equipment data from the API
      const response = await axios.get(`${API_URL}/places/`);
      setPlaces(response.data);
    } catch (error) {
      console.error("Error fetching equipment data:", error);
    } finally {
    }
  };
  const fetchDEquipment = async () => {
    try {
      const response = await axios.get(`${API_URL}/deployedEquipment/`); // Adjust the URL if necessary
      console.log("Response Data:", response.data); // Debugging
      setDEquipment(response.data); // Set the data into the state
    } catch (err) {
      console.error("Error fetching equipment types:", err);
    }
  };

  useEffect(() => {
    fetchDEquipment();
    fetchEquipment();
    fetchPlaces();
  }, []);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData, // Spread the current form data
      [name]: value, // Update the specific input field by name
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/deployedEquipment/`,
        formData
      );
      if (response.data) {
        setDEquipment((prevEquipmentTypes) => [
          ...prevEquipmentTypes,
          response.data, // Add the newly created equipment type
        ]);
        setFormData({
          equipmentId: "",
          placeId: "",
          status: "active",
          deploymentDate: "",
        });
        // If the response status is 201 (Created), show a notification
        setNotification("تجهیزات مستقر با موفقیت ساخته شد");
      } else {
        setNotification("یک ارور ناشناخته از سرور.");
      }
    } catch (error) {
      setNotification("Error creating Equipment Type. Please try again.");
      console.error("Error:", error);
    }
  };
  const openModal = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedId(null);
    setIsModalOpen(false);
  };
  const UpdateSet = (target: any) => {
    setFormData({
      equipmentId: target.equipmentId,
      placeId: target.placeId,
      status: target.status,
      deploymentDate: target.deploymentDate,
    });
    setSelectedId(target.id);
  };
  const deleteDequipment = async () => {
    if (selectedId === null) return;

    await axios.delete(`${API_URL}/deployedEquipment/${selectedId}`);
    const updatedList = DEquipment.filter(
      (equipment) => equipment.id !== selectedId
    );
    setDEquipment(updatedList);
    setIsModalOpen(false);
    setSelectedId(null);
  };
  const update = async () => {
    try {
      if (selectedId === null) return; // Prevent proceeding if no ID is selected

      // Send updated data to the API
      const response = await axios.put(
        `${API_URL}/deployedEquipment/${selectedId}`,
        formData
      );

      if (response.data) {
        // Update the local state with the updated device
        const updatedList = DEquipment.map((equipment) =>
          equipment.id === selectedId
            ? {
                ...equipment,
                ...formData,
                status: formData.status as "active" | "inactive" | "maintenance", // Type assertion

              }
            : equipment
        );
        // Reset the form and clear the selected ID
        setFormData({
          equipmentId: "",
          placeId: "",
          status: "active",
          deploymentDate: "",
        });
        setSelectedId(null);

        // Update the state with the modified list
        setDEquipment(updatedList);

        // Optional: Show a success notification
        setNotification("DEquipment updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update the DEquipment:", error);

      // Optional: Show an error notification
      setNotification("Failed to update the DEquipment. Please try again.");
    } finally {
      // Optional: Clear notifications after 3 seconds
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }
  };
  return (
    <React.Fragment>
      {notification && (
        <div className="px-4 py-3 text-sm bg-white border rounded-md border-custom-300 text-custom-500 dark:bg-zink-700 dark:border-custom-500">
          {notification}
        </div>
      )}
      <div className="card mt-10">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col items-center">
              <div className="flex flex-col items-start ">
                <label className="inline-block mb-2 text-base font-medium">
                  فعال:
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-select  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                >
                  <option value="active">فعال</option>
                  <option value="Inactive">غیر فعال</option>
                </select>
              </div>
            </div>
            <div className="mb-4 flex flex-col items-center">
              <div className="flex flex-col items-start ">
                <label className="inline-block mb-2 text-base font-medium">
                  تاریخ مستقر شدن:
                </label>
                <input
                  type="date"
                  name="deploymentDate"
                  value={formData.deploymentDate}
                  onChange={handleChange}
                  className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                ></input>
              </div>
            </div>
            <div className="mb-4 flex flex-col items-center">
              <div className="flex flex-col items-start ">
                <label className="inline-block mb-2 text-base font-medium">
                  تجهیزات:
                </label>
                <select
                  name="equipmentId"
                  value={formData.equipmentId}
                  onChange={handleChange}
                  className="form-select  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                >
                  <option value="" disabled>
                    -- Select Equipment --
                  </option>
                  {equipment.map((equipment) => (
                    <option key={equipment.id} value={equipment.id}>
                      {equipment.name} {/* Display the name of the equipment */}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col items-start ">
                <label className="inline-block mb-2 text-base font-medium">
                  محل:
                </label>
                <select
                  name="placeId"
                  value={formData.placeId}
                  onChange={handleChange}
                  className="form-select  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                >
                  <option value="" disabled>
                    -- Select place --
                  </option>
                  {places.map((place) => (
                    <option key={place.id} value={place.id}>
                      {place.name} {/* Display the name of the equipment */}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4 flex flex-col items-center">
              <div className="flex flex-col items-start ">
                {selectedId ? (
                  <>
                    <button
                      type="button"
                      onClick={update}
                      className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                    >
                      آپدیت
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                    >
                      تایید
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="card mt-2">
        <div className="card-body">
          <table className="w-full whitespace-nowrap">
            <thead>
              <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500  text-center">
                نام انبار
              </th>
              <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500 text-center">
                حجم انبار
              </th>
              <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500 text-center">
                آدرس
              </th>

              <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500  text-center">
                عملیات
              </th>
            </thead>

            <tbody className="list form-check-all">
              {DEquipment.map((equipment: any) => (
                <tr>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    {equipment.status}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    {equipment.quantity}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    {equipment.location}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => UpdateSet(equipment)}
                        className="text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:border-sky-600 active:ring active:ring-sky-100 dark:ring-sky-400/20"
                      >
                        آپدیت
                      </button>
                      <button
                        onClick={() => openModal(equipment.id)}
                        className="text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DeleteModal
          show={isModalOpen}
          onDelete={() => deleteDequipment()}
          onHide={closeModal}
        ></DeleteModal>
      </div>
    </React.Fragment>
  );
};
export default DEquipment;
