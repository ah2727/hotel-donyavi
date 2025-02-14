import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from "Common/DeleteModal";
import { Button } from "lightbox.js-react";
import { PlusCircle } from "lucide-react";
import AddTypeOfTypeOfrepair from "Common/addTypeOfTypeOfrepair";
export interface IRepairTypeType {
  id: number;
  typeName: string;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IRepairType {
  id: number;
  name: string;
  repairTypeTypeId: number;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
const Typeofchange = () => {
  const [types, setTypes] = useState<IRepairType[]>([]);
  const [repairTypetypes, setRepairTypeTypes] = useState<IRepairTypeType[]>([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const [isModalOpenMainPlace, setIsModalOpenMainPlace] = useState(false); // Track modal visibility
  const [selectedId, setSelectedId] = useState<number | null>(null); // Track the selected id
  const [notification, setNotification] = useState(""); // State to store the notification message
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  const [formData, setFormData] = useState({
    name: "",
    repairTypeTypeId: "",
    description: "",
  });
  const handleChange = (event: any) => {
    const { name, value } = event.target; // Get the name and value of the input
    setFormData({
      ...formData, // Keep previous form data
      [name]: value, // Update only the field that changed
    });
  };
  const handleRepaiTypeTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      repairTypeTypeId: e.target.value,
    }));
  };
  const update = async () => {
    try {
      if (selectedId === null) return; // Prevent proceeding if no ID is selected

      // Send updated data to the API
      const response = await axios.put(
        `${API_URL}/repairType/${selectedId}`,
        formData
      );

      if (response.data) {
        // Update the local state with the updated device
        const updatedList = types.map((type) =>
          type.id === selectedId
            ? {
                ...type,
                ...response.data,
              }
            : type
        );
        // Reset the form and clear the selected ID
        setFormData({
          name: "",
          description: "",
          repairTypeTypeId: "",
        });
        setSelectedId(null);

        // Update the state with the modified list
        setTypes(updatedList);

        // Optional: Show a success notification
        setNotification("Places updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update the device:", error);

      // Optional: Show an error notification
      setNotification("Failed to update the device. Please try again.");
    } finally {
      // Optional: Clear notifications after 3 seconds
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }
  };
  useEffect(() => {
    axios.get(`${API_URL}/repairType`).then((response) => {
      setTypes(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${API_URL}/repairTypeType`).then((response) => {
      setRepairTypeTypes(response.data);
    });
  }, []);
  const openModalMainPalce = () => {
    setIsModalOpenMainPlace(true);
  };
  const closeModalMainPlace = () => {
    setIsModalOpenMainPlace(false);
    axios.get(`${API_URL}/repairType`).then((response) => {
      setTypes(response.data);
    });
  };
  const closeModal = () => {
    setSelectedId(null);
    setIsModalOpen(false);
  };
  const openModal = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };
  const UpdateSet = (target: any) => {
    setFormData({
      name: target.name,
      repairTypeTypeId: target.repairTypeTypeId,
      description: target.description,
    });
    setSelectedId(target.id);
  };
  const deleterepairType = async () => {
    if (selectedId === null) return;

    await axios.delete(`${API_URL}/repairType/${selectedId}`);
    const updatedList = types.filter((type) => type.id !== selectedId);
    setTypes(updatedList);
    setIsModalOpen(false);
    setSelectedId(null);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/repairType/`, formData);
      if (response.data) {
        setTypes((prevEquipmentTypes) => [
          ...prevEquipmentTypes,
          response.data, // Add the newly created equipment type
        ]);
        setFormData({
            name: "",
            repairTypeTypeId: "",
            description: "",
        });
        // If the response status is 201 (Created), show a notification
        setNotification("شخص با موفقیت ساخته شد");
      } else {
        setNotification("یک ارور ناشناخته از سرور.");
      }
    } catch (error) {
      setNotification("Error creating Equipment Type. Please try again.");
      console.error("Error:", error);
    }
  };
  return (
    <React.Fragment>
      <div className="card mt-10">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2">
              <div className="flex  items-center gap-2">
                <div className="flex flex-col items-center">
                  <label className="inline-block mb-2 text-base font-medium">
                    نام تعمیر:
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="name"
                    className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                    value={formData.name}
                  />
                </div>
              </div>
              <div className="flex  items-center gap-2">
                <div className="flex flex-col items-center">
                  <label className="inline-block mb-2 text-base font-medium">
                    نوع تعمیر:
                  </label>
                  <div className="flex items-center gap-2">
                    <PlusCircle onClick={openModalMainPalce} />
                    <select
                      value={formData.repairTypeTypeId}
                      onChange={handleRepaiTypeTypeChange}
                      className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                    >
                      <option value="">Select a main place</option>
                      {repairTypetypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.typeName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4 mt-10 flex flex-col items-center">
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
                نام تعمیر
              </th>
              <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500 text-center">
                نام نوع تعمیر
              </th>
              <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500  text-center">
                عملیات
              </th>
              <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500  text-center">
                عملیات
              </th>
            </thead>
            <tbody className="list form-check-all">
              {types.map((type: any) => (
                <tr>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    {type.name}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    {type.repairTypeTypeId}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    {type.description}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => UpdateSet(type)}
                        className="text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:border-sky-600 active:ring active:ring-sky-100 dark:ring-sky-400/20"
                      >
                        آپدیت
                      </button>
                      <button
                        onClick={() => openModal(type.id)}
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
      </div>
      <AddTypeOfTypeOfrepair
        show={isModalOpenMainPlace}
        onHide={closeModalMainPlace}
      ></AddTypeOfTypeOfrepair>
      <DeleteModal
        show={isModalOpen}
        onDelete={() => deleterepairType()}
        onHide={closeModal}
      ></DeleteModal>
    </React.Fragment>
  );
};

export default Typeofchange;
