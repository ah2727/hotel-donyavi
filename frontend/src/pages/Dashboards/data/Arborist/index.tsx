import React from "react";
import { useNavigate } from "react-router-dom";

const Arborist = () => {
  const navigate = useNavigate();

  const navigateToPost = (url:any) => {
    navigate(url); // Navigate to /post/:id
  };

  return (
    <React.Fragment>
      <div className="card mt-10">
        <div className="card-body">
          <div className="flex gap-2">
            <button onClick={() => navigate("/DefinEquipment")} className="text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:border-sky-600 active:ring active:ring-sky-100 dark:ring-sky-400/20">
              تعریف تچهیزات
            </button>
            <button onClickCapture={() => navigate("/TypeEquipment")} className="text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:border-sky-600 active:ring active:ring-sky-100 dark:ring-sky-400/20">
              تعریف نوع تجهیزات
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Arborist;
