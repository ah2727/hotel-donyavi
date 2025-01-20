import React, { useState, useEffect } from "react";
import axios from "axios";
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
const DEquipment = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [equipment, setEquipmnet] = useState<Equipment[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [notification, setNotification] = useState(""); // State to store the notification message
  const [selectedId, setSelectedId] = useState<number | null>(null); // Track the selected id

  const [formData, setFormData] = useState({
    selectedEquipment: "",
    selectedPlace: "",
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
  useEffect(() => {
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
        setEquipmnet((prevEquipmentTypes) => [
          ...prevEquipmentTypes,
          response.data, // Add the newly created equipment type
        ]);
        setFormData({
          selectedEquipment: "",
          selectedPlace: "",
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
                  name="selectedEquipment"
                  value={formData.selectedEquipment}
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
                  name="selectedPlace"
                  value={formData.selectedPlace}
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
                      //   onClick={update}
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
              {/* {TechnicalWarehouse.map((Warehous: any) => (
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
              ))} */}
            </tbody>
          </table>
        </div>
        {/* <DeleteModal
          show={isModalOpen}
          onDelete={() => deleteWarhous()}
          onHide={closeModal}
        ></DeleteModal> */}
      </div>
    </React.Fragment>
  );
};
export default DEquipment;
