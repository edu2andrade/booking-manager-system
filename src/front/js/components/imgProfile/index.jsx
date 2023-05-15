import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
export const ImgProfile = () => {
  const navigate = useNavigate();
  const handlesubmit = () => {
    navigate("/");
  };
  return (
    <main className="mainContainerimg">
      <div className="parent">
        <div className="child">
          <img
            src="https://pbs.twimg.com/profile_images/1243475459125456896/e-zIQiFY_400x400.jpg"
            alt="Daenerys Targaryen"
            onClick={handlesubmit}
          />

          <h5 className="nametitle">Danny Targaryen</h5>
          <p className="nametitle2">danny@email.com</p>
          <button type="submit" className="btnPhoto">
            Change Photo
          </button>
        </div>
      </div>
    </main>
  );
};
