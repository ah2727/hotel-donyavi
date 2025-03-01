import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from "Common/DeleteModal";
import { Button } from "lightbox.js-react";
export interface column {
  header: string;
  accessorKey: string;
  enableColumnFilter: boolean;
  enableSorting: boolean;
}
type EquipmentType = {
  id: number; // Represents the unique identifier
  name: string; // Name of the equipment
  description: string; // Description of the equipment
  createdAt: string; // Timestamp when it was created
  updatedAt: string; // Timestamp when it was last updated
};
const TypeEquipment = () => {
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const [selectedId, setSelectedId] = useState<number | null>(null); // Track the selected id
  const API_URL = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [notification, setNotification] = useState(""); // State to store the notification message

  // Handle form input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/equipment/equipment-types/`,
        formData
      );
      console.log(response.data);
      if (response.data) {
        setEquipmentTypes((prevEquipmentTypes) => [
          ...prevEquipmentTypes,
          response.data, // Add the newly created equipment type
        ]);
        // If the response status is 201 (Created), show a notification
        setNotification("نوع تجهیزات با موفقیت ساخته شد");
      } else {
        setNotification("یک ارور ناشناخته از سرور.");
      }
    } catch (error) {
      setNotification("Error creating Equipment Type. Please try again.");
      console.error("Error:", error);
    }

    // Clear the form after submission
    setFormData({
      name: "",
      description: "",
    });

    // Automatically hide the notification after 3 seconds
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };
  const fetchEquipmentTypes = async () => {
    try {
      const response = await axios.get(`${API_URL}/equipment/equipment-types`); // Adjust the URL if necessary
      console.log("Response Data:", response.data); // Debugging
      setEquipmentTypes(response.data); // Set the data into the state
    } catch (err) {
      console.error("Error fetching equipment types:", err);
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
  const deleteType = async () => {
    if (selectedId === null) return;

    await axios.delete(`${API_URL}/equipment/equipment-types/${selectedId}`);
    const updatedList = equipmentTypes.filter(
      (equipment) => equipment.id !== selectedId
    );
    setEquipmentTypes(updatedList);
    setIsModalOpen(false);
    setSelectedId(null);
  };
  const UpdateSet = (target: any) => {
    setFormData({ name: target.name, description: target.description });
    setSelectedId(target.id);
  };
  const update = async () => {
    if (selectedId === null) return;
    await axios.put(
      `${API_URL}/equipment/equipment-types/${selectedId}`,
      formData
    );

    const updatedList = equipmentTypes.map(
      (equipment) =>
        equipment.id === selectedId
          ? { ...equipment, ...formData } // Replace the old data with updated data
          : equipment // Keep other items unchanged
    );
    setFormData({
      name: "",
      description: "",
    });
    setSelectedId(null);

    // Update the state with the modified list
    setEquipmentTypes(updatedList);
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchEquipmentTypes();
  }, []); // Empty dependency array means this runs once when the component mounts

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
                  نام نوع تجهیزات:
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                ></input>
              </div>
            </div>
            <div className="mb-4 flex flex-col items-center">
              <div className="flex flex-col items-start ">
                <label className="inline-block mb-2 text-base font-medium">
                  توضیحات:
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                ></textarea>
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
                نام نوع تجهیزات
              </th>
              <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500 text-center">
                توضیحات
              </th>
              <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500  text-center">
                عملیات
              </th>
            </thead>

            <tbody className="list form-check-all">
              {equipmentTypes.map((equipmentType: any) => (
                <tr>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    {equipmentType.name}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    {equipmentType.description}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => UpdateSet(equipmentType)}
                        className="text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:border-sky-600 active:ring active:ring-sky-100 dark:ring-sky-400/20"
                      >
                        آپدیت
                      </button>
                      <button
                        onClick={() => openModal(equipmentType.id)}
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
          onDelete={() => deleteType()}
          onHide={closeModal}
        ></DeleteModal>
      </div>
    </React.Fragment>
  );
};
export default TypeEquipment;
