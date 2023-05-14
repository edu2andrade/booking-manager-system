import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
export const ImgProfile = () => {
  const navigate = useNavigate();
  const handlesubmit = () => {
    navigate("/");
  };
  return (
    <main className="mainContainer">
      <div className="parent">
        <div className="child">
          <img
            className="title"
            src="https://pbs.twimg.com/profile_images/1243475459125456896/e-zIQiFY_400x400.jpg"
            alt="Daenerys Targaryen"
            onClick={handlesubmit}
          />
        </div>
      </div>
    </main>
  );
};
