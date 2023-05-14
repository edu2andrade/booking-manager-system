import React, { useState } from "react";
import Input from "../input/index.jsx";
export const ProfileForm = () => {
  return (
    <div className="bac">
      <form>
        <Input
          icon={<i className="fa-solid fa-circle-user"></i>}
          type="text"
          placeholder="Username"
          name="username"
        />
        <Input
          icon={<i className="fa-solid fa-circle-user"></i>}
          type="text"
          placeholder="First name"
          name="First name"
        />
        <Input
          icon={<i className="fa-solid fa-circle-user"></i>}
          type="text"
          placeholder="Last name"
          name="Last name"
        />
        <Input
          icon={<i className="fa-solid fa-envelope"></i>}
          type="email"
          placeholder="Email"
          name="email"
        />
        <button type="submit" className="submitBtn boxShadow">
          Update
        </button>
      </form>
    </div>
  );
};
