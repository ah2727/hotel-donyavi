import React, { useState } from "react";
import axios from "axios";

export type DeviceType = {
  id: number; // Primary key, auto-incremented
  name: string; // Name of the device (required)
  brand: string; // Brand of the device (required)
  model: string; // Model of the device (required)
  serialNumber?: string | null; // Unique serial number (optional)
  purchaseDate?: string | null; // Purchase date in ISO string format (optional)
  status: "active" | "inactive" | "retired"; // Enum for device status
  createdAt?: Date; // Timestamp for creation (added by Sequelize)
  updatedAt?: Date; // Timestamp for last update (added by Sequelize)
};

const TypeDevice = () => {
  const [deviceTypes, setDeviceTypes] = useState<DeviceType[]>([]);
  const [notification, setNotification] = useState(""); // State to store the notification message
  const [formData, setFormData] = useState({
    id: null, // For auto-generated IDs, you can set it to null initially
    name: "", // Initial value for the equipment name
    brand: "", // Initial value for the brand
    model: "", // Initial value for the model
    serialNumber: "", // Optional field, defaulting to an empty string
    purchaseDate: "", // Optional field, ISO date string (use empty string initially)
    status: "active", // Default status value, matching the Sequelize default
  });
  const API_URL = process.env.REACT_APP_API_URL;

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
        `${API_URL}/device/devices/`,
        formData
      );
      console.log(response.data);
      if (response.data) {
        setDeviceTypes((prevEquipmentTypes) => [
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
      id: null, // For auto-generated IDs, you can set it to null initially
      name: "", // Initial value for the equipment name
      brand: "", // Initial value for the brand
      model: "", // Initial value for the model
      serialNumber: "", // Optional field, defaulting to an empty string
      purchaseDate: "", // Optional field, ISO date string (use empty string initially)
      status: "active", // Default status value, matching the Sequelize default
    });

    // Automatically hide the notification after 3 seconds
    setTimeout(() => {
      setNotification("");
    }, 3000);
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
                  برند:
                </label>
                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                ></input>
              </div>
              <div className="flex flex-col items-start ">
                <label className="inline-block mb-2 text-base font-medium">
                  مدل:
                </label>
                <input
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                ></input>
              </div>
              <div className="flex flex-col items-start ">
                <label className="inline-block mb-2 text-base font-medium">
                  سریال نامبر:
                </label>
                <input
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                ></input>
              </div>
              <div className="flex flex-col items-start ">
                <label className="inline-block mb-2 text-base font-medium">
                  تاریخ خرید:
                </label>
                <input
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                ></input>
              </div>
              <div className="flex flex-col items-start ">
                <label className="inline-block mb-2 text-base font-medium">
                  وضعیت:
                </label>
                <select
                  className="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="active">فعال</option>
                  <option value="inactive">غیرفعال</option>
                  <option value="retired">بازنشسته</option>
                </select>
              </div>
            </div>
            <div className="mb-4 flex flex-col items-center">
              <div className="flex flex-col items-start ">
                {/* {selectedId ? ( */}
                <>
                  <button
                    type="button"
                    // onClick={update}
                    className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                  >
                    آپدیت
                  </button>
                </>
                {/* ) : ( */}
                <>
                  <button
                    type="submit"
                    className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                  >
                    تایید
                  </button>
                </>
                {/* )} */}
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
              {/* {equipmentTypes.map((equipmentType: any) => ( */}
              <tr>
                <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                  {/* {equipmentType.name} */}
                </td>
                <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                  {/* {equipmentType.description} */}
                </td>
                <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      // onClick={() => UpdateSet(equipmentType)}
                      className="text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:border-sky-600 active:ring active:ring-sky-100 dark:ring-sky-400/20"
                    >
                      آپدیت
                    </button>
                    <button
                      // onClick={() => openModal(equipmentType.id)}
                      className="text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20"
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
              {/* ))} */}
            </tbody>
          </table>
        </div>
        {/* <DeleteModal
            show={isModalOpen}
            onDelete={() => deleteType()}
            onHide={closeModal}
          ></DeleteModal> */}
      </div>
    </React.Fragment>
  );
};
export default TypeDevice;
