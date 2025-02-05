import React from "react";
import Modal from "./Components/Modal";
import { useState, useEffect } from "react";
import { X, PlusCircle, EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface props {
  show: boolean;
  onHide: () => void;
}
export type PlaceOption = {
  id: string;
  name: string;
  address: string;
};

const AddMainPlaceModal: React.FC<props> = ({ show, onHide }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [isAdd, setIsAdd] = useState(false);
  const [MainPlace, setMainPlace] = useState<PlaceOption[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
  });
  const [selectedId, setSelectedId] = useState(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleIsAdd = () => {
    setIsAdd(true);
  };
  const handleIsList = () => {
    setIsAdd(false);
  };
  useEffect(() => {
    async function getPlace() {
      const response = await axios.get(`${API_URL}/places/mainplace/`);
      setMainPlace(response.data);
    }
    getPlace();
  }, []);
  const UpdateSet = (target: any) => {
    setFormData({
      name: target.name,
      address: target.address,
      description: target.description,
    });
    setSelectedId(target.id);
    setIsAdd(true);
  };
  const update = async () => {
    try {
      if (selectedId === null) return; // Prevent proceeding if no ID is selected

      // Send updated data to the API
      const response = await axios.put(
        `${API_URL}/places/mainplace/${selectedId}`,
        formData
      );

      if (response.data) {
        // Update the local state with the updated device
        const updatedList = MainPlace.map((place) =>
          place.id === selectedId
            ? {
                ...place,
                ...formData,
              }
            : place
        );
        // Reset the form and clear the selected ID
        setFormData({
          name: "",
          address: "",
          description: "",
        });
        setSelectedId(null);

        // Update the state with the modified list
        setMainPlace(updatedList);
        setIsAdd(false); // Switch back to the list view
        // Optional: Show a success notification
      }
    } catch (error) {
    } finally {
    }
  };
  const HandlCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`${API_URL}/places/mainplace/`, formData);
      const updatedList = MainPlace.map((place) =>
        place.id === selectedId
          ? {
              ...place,
              ...formData,
            }
          : place
      );
      setMainPlace(updatedList);
      setFormData({
        name: "",
        address: "",
        description: "",
      });
      setIsAdd(false);
      onHide();
    } catch {
      console.log("error");
    }
  };
  const HandlDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/places/mainplace/${id}`);
      setMainPlace(MainPlace.filter((place: any) => place.id !== id));
    } catch {
      console.log("error");
    }
  };
  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onHide}
        id="deleteModal"
        modal-center="true"
        className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
        dialogClassName="w-screen md:w-[25rem] bg-white shadow rounded-md dark:bg-zink-600"
      >
        <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] overflow-y-auto px-6 py-8">
          <div className="float-right">
            <button
              data-modal-close="deleteModal"
              className="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500"
            >
              <X className="size-5" onClick={onHide} />
            </button>
          </div>
          <div className="mt-5 text-center">
            {isAdd ? (
              <>
                <EyeIcon onClick={handleIsList} />
                <form onSubmit={HandlCreate}>
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
                    <div className="mb-4 flex flex-col items-center">
                      <div className="flex flex-col items-start ">
                        <label className="inline-block mb-2 text-base font-medium">
                          آدرس:
                        </label>
                        <input
                          name="address"
                          value={formData.address}
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
                        <input
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="form-input  border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                        ></input>
                      </div>
                    </div>
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
                </form>
              </>
            ) : (
              <>
                <PlusCircle onClick={handleIsAdd} />
                <table className="w-full whitespace-nowrap">
                  <thead>
                    <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500  text-center">
                      نام
                    </th>
                    <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500 text-center">
                      آدرس
                    </th>
                    <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500 text-center">
                      توضیحات
                    </th>
                    <th className="sort px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500 text-center">
                      عملیات
                    </th>
                  </thead>
                  <tbody className="list form-check-all">
                    {MainPlace?.map((place: any) => (
                      <tr>
                        <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                          {place.name}
                        </td>
                        <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                          {place.address}
                        </td>
                        <td className="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id text-center">
                          {place.description}
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
                              onClick={() => HandlDelete(place.id)}
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
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default AddMainPlaceModal;
