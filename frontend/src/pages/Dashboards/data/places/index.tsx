import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from "Common/DeleteModal";
import AddMainPlaceModal from "Common/addMainPlaceModal";
import AddSubPlaceModal from "Common/addSubPlaceModal";
import { PlusCircle } from "lucide-react";
interface Place {
  id: number;
  name: string;
  description: string;
  address: string;
  mainPlace: PlaceOption;
  subPlace: PlaceOption;
}
export type PlaceOption = {
  id: string;
  name: string;
  address: string;
};

const Places = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [notification, setNotification] = useState(""); // State to store the notification message
  const [selectedId, setSelectedId] = useState<number | null>(null); // Track the selected id
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const [isModalOpenMainPlace, setIsModalOpenMainPlace] = useState(false); // Track modal visibility
  const [isModalOpenSubPlace, setIsModalOpenSubPlace] = useState(false); // Track modal visibility
  const [mainPlaces, setMainPlaces] = useState<PlaceOption[]>([]);
  const [subPlaces, setSubPlaces] = useState<PlaceOption[]>([]);
  const [selectedOptionMainPlace, setSelectedOptionMainPlace] =
    useState<string>("");
  const [selectedOptionSubPlace, setSelectedOptionSubPlace] =
    useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    selectedMainPlace: "",
    selectedSubPlace: "",
  });
  const [places, setPlaces] = useState<Place[]>([]);
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
      const response = await axios.post(`${API_URL}/places/place/`, formData);
      if (response.data) {
        setPlaces((prevEquipmentTypes) => [
          ...prevEquipmentTypes,
          response.data, // Add the newly created equipment type
        ]);
        setFormData({
          name: "",
          description: "",
          address: "",
          selectedMainPlace: "",
          selectedSubPlace: "",
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
  const fetchDevicesTypes = async () => {
    try {
      const response = await axios.get(`${API_URL}/places/place/`); // Adjust the URL if necessary
      console.log("Response Data:", response.data); // Debugging
      setPlaces(response.data); // Set the data into the state
    } catch (err) {
      console.error("Error fetching equipment types:", err);
    }
  };

  useEffect(() => {
    fetchDevicesTypes();
  }, []); // Empty dependency array means this runs once when the component mounts
  const openModal = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };
  const openModalMainPalce = () => {
    setIsModalOpenMainPlace(true);
  };
  const openModalSubPalce = () => {
    setIsModalOpenSubPlace(true);
  };
  const closeModalMainPlace = () => {
    setIsModalOpenMainPlace(false);
    // Fetch MainPlaces
    const fetchMainPlaces = async () => {
      try {
        const response = await axios.get(`${API_URL}/places/mainplace/`);

        setMainPlaces(response.data);
      } catch (error) {
        console.error("Error fetching main places:", error);
      }
    };

    // Fetch SubPlaces

    fetchMainPlaces();
  };
  const closeModalSubPlace = () => {
    setIsModalOpenSubPlace(false);

    // Fetch MainPlaces

    // Fetch SubPlaces
    const fetchSubPlaces = async () => {
      try {
        const response = await axios.get(`${API_URL}/places/subplace/`);

        setSubPlaces(response.data);
      } catch (error) {
        console.error("Error fetching sub places:", error);
      }
    };

    fetchSubPlaces();
    // empty dependency array means this runs once on mount
  };
  // Close modal
  const closeModal = () => {
    setSelectedId(null);
    setIsModalOpen(false);
  };
  const UpdateSet = (target: any) => {
    setFormData({
      name: target.name,
      description: target.description,
      address: target.address,
      selectedMainPlace: target.mainPlace?.id,
      selectedSubPlace: target.subPlace?.id,
    });
    setSelectedId(target.id);
  };
  const deletePlaces = async () => {
    if (selectedId === null) return;

    await axios.delete(`${API_URL}/places/place/${selectedId}`);
    const updatedList = places.filter((place) => place.id !== selectedId);
    setPlaces(updatedList);
    setIsModalOpen(false);
    setSelectedId(null);
  };
  const update = async () => {
    try {
      if (selectedId === null) return; // Prevent proceeding if no ID is selected

      // Send updated data to the API
      const response = await axios.put(
        `${API_URL}/places/place/${selectedId}`,
        formData
      );

      if (response.data) {
        // Update the local state with the updated device
        const updatedList = places.map((place) =>
          place.id === selectedId
            ? {
                ...place,
                ...response.data,
              }
            : place
        );
        // Reset the form and clear the selected ID
        setFormData({
          name: "",
          description: "",
          address: "",
          selectedMainPlace: "",
          selectedSubPlace: "",
        });
        setSelectedId(null);

        // Update the state with the modified list
        setPlaces(updatedList);

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
    // Fetch MainPlaces
    const fetchMainPlaces = async () => {
      try {
        const response = await axios.get(`${API_URL}/places/mainplace/`);
        setMainPlaces(response.data);
      } catch (error) {
        console.error("Error fetching main places:", error);
      }
    };

    // Fetch SubPlaces
    const fetchSubPlaces = async () => {
      try {
        const response = await axios.get(`${API_URL}/places/subplace/`);
        setSubPlaces(response.data);
      } catch (error) {
        console.error("Error fetching sub places:", error);
      }
    };
    
    fetchMainPlaces();
    fetchSubPlaces();
  }, []); // empty dependency array means this runs once on mount
  const handleMainPlaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      selectedMainPlace: e.target.value,
    }));
  };

  // Handle changes for the SubPlace select
  const handleSubPlaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      selectedSubPlace: e.target.value,
    }));
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                ></input>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="mb-4 flex flex-col items-center">
                <div className="flex flex-col items-start ">
                  <label className="inline-block mb-2 text-base font-medium">
                    مکان اصلی:
                  </label>
                  <div className="flex  items-center gap-2">
                    <PlusCircle onClick={openModalMainPalce} />
                    <select
                      value={formData.selectedMainPlace}
                      onChange={handleMainPlaceChange}
                      className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                    >
                      <option value="">Select a main place</option>
                      {mainPlaces.map((place) => (
                        <option key={place.id} value={place.id}>
                          {place.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-4 flex flex-col items-center">
                <div className="flex flex-col items-start ">
                  <label className="inline-block mb-2 text-base font-medium">
                    مکان فرعی:
                    <div className="flex items-center gap-2">
                      <PlusCircle onClick={openModalSubPalce} />
                      <select
                        value={formData.selectedSubPlace}
                        onChange={handleSubPlaceChange}
                        className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                      >
                        <option value="">Select a main place</option>
                        {subPlaces.map((place) => (
                          <option key={place.id} value={place.id}>
                            {place.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>
                </div>
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
                نام مکان
              </th>
              <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500 text-center">
                مکان اصلی
              </th>
              <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500 text-center">
                مکان فرعی
              </th>
              <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500  text-center">
                عملیات
              </th>
            </thead>

            <tbody className="list form-check-all">
              {places.map((place: any) => (
                <tr>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    {place.name}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    {place.mainPlace?.name}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    {place.subPlace?.name}
                  </td>
                  <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => UpdateSet(place)}
                        className="text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:border-sky-600 active:ring active:ring-sky-100 dark:ring-sky-400/20"
                      >
                        آپدیت
                      </button>
                      <button
                        onClick={() => openModal(place.id)}
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
          onDelete={() => deletePlaces()}
          onHide={closeModal}
        ></DeleteModal>
        <AddMainPlaceModal
          show={isModalOpenMainPlace}
          onHide={closeModalMainPlace}
        ></AddMainPlaceModal>
        <AddSubPlaceModal
          show={isModalOpenSubPlace}
          onHide={closeModalSubPlace}
        ></AddSubPlaceModal>
      </div>
    </React.Fragment>
  );
};

export default Places;
