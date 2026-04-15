import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./features/user/pages/Login";
import Register from "./features/user/pages/Register";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="home-placeholder">PrimeTrade Home - Welcome</div>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
