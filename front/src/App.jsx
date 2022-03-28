import React, { useState } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import "./App.css";
import Login from "./components/auth/Login";
import Home from "./components/Home/Home";
import Page1 from "./components/Pages/Page1/Page1";
import Page2 from "./components/Pages/Page2/Page2";
import Layout from "./hoc/Layout/Layout";

function App() {
  const [isAuthenticated] = useState(localStorage.getItem("token"));
  let routes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
  if (isAuthenticated) {
    routes = (
      <Layout>
        <Routes>
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    );
  }
  return <BrowserRouter>{routes}</BrowserRouter>;
}

export default App;
