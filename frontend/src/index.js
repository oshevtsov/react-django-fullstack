import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import HomeView from "./views/HomeView";
import PhotosView from "./views/PhotosView";
import ProfileView from "./views/ProfileView";
import UploadView from "./views/UploadView";
import LoginView from "./views/LoginView";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/photos" element={<PhotosView />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/upload" element={<UploadView />} />
          <Route path="/login" element={<LoginView />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
