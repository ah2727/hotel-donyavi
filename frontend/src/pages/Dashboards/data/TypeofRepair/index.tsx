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
const Typeofchange = () => {
  const [types, setTypes] = useState<IRepairTypeType[]>([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const [isModalOpenMainPlace, setIsModalOpenMainPlace] = useState(false); // Track modal visibility

  const [formData, setFormData] = useState({
    name: "",
    selectedTypeTypeChange: "",
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
      selectedMainPlace: e.target.value,
    }));
  };

  useEffect(() => {
    axios.get(`${API_URL}/repairTypeType`).then((response) => {
      setTypes(response.data);
    });
  }, []);
  const openModalMainPalce = () => {
    setIsModalOpenMainPlace(true);
  };
  const closeModalMainPlace = () => {
    setIsModalOpenMainPlace(false);
  }
  return (
    <React.Fragment>
      <div className="card mt-10">
        <div className="card-body">
          <form>
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
                      value={formData.selectedTypeTypeChange}
                      onChange={handleRepaiTypeTypeChange}
                      className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                    >
                      <option value="">Select a main place</option>
                      {types.map((place) => (
                        <option key={place.id} value={place.id}>
                          {place.typeName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
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

            <tbody className="list form-check-all"></tbody>
          </table>
        </div>
      </div>
      <AddTypeOfTypeOfrepair
        show={isModalOpenMainPlace}
        onHide={closeModalMainPlace}
      ></AddTypeOfTypeOfrepair>
    </React.Fragment>
  );
};

export default Typeofchange;
