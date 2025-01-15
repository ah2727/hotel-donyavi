import React, { useEffect } from "react";
import BreadCrumb from "Common/BreadCrumb";
import WelcomeWidget from "./WelcomeWidget";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Wrap the navigation logic in a function
    const redirect = () => {
      navigate("/dashboard");
    };

    redirect();
  }, [navigate]);

  return (
    <React.Fragment>
      <BreadCrumb title="صفحه اصلی" pageTitle="داشبورد" />
      <div className="grid grid-cols-12 gap-x-5">
        <WelcomeWidget />
      </div>
    </React.Fragment>
  );
};

export default MainPage;
