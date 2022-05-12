import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./auth";
import Layout, { Protected } from "./views/Layout";
import Home from "./views/Home";
import Photos from "./views/Photos";
import Profile from "./views/Profile";
import Upload from "./views/Upload";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="photos" element={<Photos />} />
            <Route element={<Protected />}>
              <Route path="profile" element={<Profile />} />
              <Route path="upload" element={<Upload />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
