import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from "Common/DeleteModal";

export interface TechnicalWarehouse {
  id?: number;
  quantity: number;
  location?: string;
  category: string;
  isAvailable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const TechnicalWarehouse = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [notification, setNotification] = useState(""); // State to store the notification message
  const [selectedId, setSelectedId] = useState<number | null>(null); // Track the selected id
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const [formData, setFormData] = useState({
    name:"",
    quantity: 0,
    location: "",
    category: "",
    isAvailable: "true",
  });
  const [TechnicalWarehouse, setTechnicalWarehouse] = useState<
    TechnicalWarehouse[]
  >([]);

  const handleChange = (event: any) => {
    const { name, value } = event.target; // Get the name and value of the input
    setFormData({
      ...formData, // Keep previous form data
      [name]: value, // Update only the field that changed
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/technicalWarehouse/`, formData);
      if (response.data) {
        setTechnicalWarehouse((prevEquipmentTypes) => [
          ...prevEquipmentTypes,
          response.data, // Add the newly created equipment type
        ]);
        setFormData({
          name:"",
          quantity:0,
          location: "",
          category: "",
          isAvailable: "true",
        });
        // If the response status is 201 (Created), show a notification
        setNotification("انبار با موفقیت ساخته شد");
      } else {
        setNotification("یک ارور ناشناخته از سرور.");
      }
    } catch (error) {
      setNotification("Error creating Equipment Type. Please try again.");
      console.error("Error:", error);
    }
  };
  const fetchtechnicalWarehouse = async () => {
    try {
      const response = await axios.get(`${API_URL}/technicalWarehouse/`); // Adjust the URL if necessary
      console.log("Response Data:", response.data); // Debugging
      setTechnicalWarehouse(response.data); // Set the data into the state
    } catch (err) {
      console.error("Error fetching equipment types:", err);
    }
  };

  useEffect(() => {
    fetchtechnicalWarehouse();
  }, []); // Empty dependency array means this runs once when the component mounts

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
      name: target.name,
      quantity: target.quantity,
      location: target.location,
      category: target.category,
      isAvailable: target.isAvailable,
    });
    setSelectedId(target.id);
  };
  const deleteWarhous = async () => {
    if (selectedId === null) return;

    await axios.delete(`${API_URL}/technicalWarehouse/${selectedId}`);
    const updatedList = TechnicalWarehouse.filter((Warehous) => Warehous.id !== selectedId);
    setTechnicalWarehouse(updatedList);
    setIsModalOpen(false);
    setSelectedId(null);
  };
  const update = async () => {
    try {
      if (selectedId === null) return; // Prevent proceeding if no ID is selected

      // Send updated data to the API
      const response = await axios.put(
        `${API_URL}/technicalWarehouse/${selectedId}`,
        formData
      );

      if (response.data) {
        // Update the local state with the updated device
        const updatedList = TechnicalWarehouse.map((Warehous) =>
          Warehous.id === selectedId
            ? {
                ...Warehous,
                ...formData,
                isAvailable: Warehous.isAvailable === true, // Convert string to boolean
              }
            : Warehous
        );
        // Reset the form and clear the selected ID
        setFormData({
          name:"",
          quantity: 0,
          location: "",
          category: "",
          isAvailable: "true",
        });
        setSelectedId(null);

        // Update the state with the modified list
        setTechnicalWarehouse(updatedList);

        // Optional: Show a success notification
        setNotification("TechnicalWarehouse updated successfully!");
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
                  نام:
                </label>
                <input
                  type="text"
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
                  حجم انبار:
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                ></input>
              </div>
            </div>
            <div className="mb-4 flex flex-col items-center">
              <div className="flex flex-col items-start ">
                <label className="inline-block mb-2 text-base font-medium">
                  آدرس:
                </label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                ></input>
              </div>
            </div>
            <div className="mb-4 flex flex-col items-center">
              <div className="flex flex-col items-start ">
                <label className="inline-block mb-2 text-base font-medium">
                  محتویات:
                </label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                ></input>
              </div>
            </div>
            <div className="mb-4 flex flex-col items-center">
              <div className="flex flex-col items-start ">
                <label className="inline-block mb-2 text-base font-medium">
                  فعال:
                </label>
                <select
                  name="isAvailable"
                  value={formData.isAvailable}
                  onChange={handleChange}
                  className="form-select  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                >
                  <option value="true">فعال</option>
                  <option value="false">غیر فعال</option>
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
              {TechnicalWarehouse.map((Warehous: any) => (
                <tr>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    {Warehous.name}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    {Warehous.quantity}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    {Warehous.location}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => UpdateSet(Warehous)}
                        className="text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:border-sky-600 active:ring active:ring-sky-100 dark:ring-sky-400/20"
                      >
                        آپدیت
                      </button>
                      <button
                        onClick={() => openModal(Warehous.id)}
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
          onDelete={() => deleteWarhous()}
          onHide={closeModal}
        ></DeleteModal>
      </div>
    </React.Fragment>
  );
};

export default TechnicalWarehouse;
