import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./features/user/pages/Login";
import Register from "./features/user/pages/Register";
import Home from "./features/user/pages/Home.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
