import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";
import { BackendURL } from "./components/backendURL";

import injectContext from "./store/appContext";
import HomePage from "./pages/home/index.jsx";
import UserRegisterPage from "./pages/userRegister/index.jsx";
import LoginPage from "./pages/login/index.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<UserRegisterPage />} path="/user-register" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
