import React from "react";
import Modal from "./Components/Modal";
import { useState } from "react";
import { X, PlusCircle, EyeIcon } from "lucide-react";

interface props {
  show: boolean;
  onHide: () => void;
}

const AddMainPlaceModal: React.FC<props> = ({ show, onHide }) => {
  const [isAdd, setIsAdd] = useState(false);

  const handleIsAdd = () => {
    setIsAdd(true);
  };
  const handleIsList = () => {
    setIsAdd(false);
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
                <></>
              </>
            ) : (
              <>
                <PlusCircle onClick={handleIsAdd} />
                <div className=""></div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default AddMainPlaceModal;
