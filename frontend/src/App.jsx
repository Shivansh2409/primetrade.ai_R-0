import React from "react";
import { Routes, Route } from "react-router-dom";
import Protected from "./features/user/components/Protected.jsx";
import Login from "./features/user/pages/Login";
import Register from "./features/user/pages/Register";
import Home from "./features/notes/pages/Home.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />
    </Routes>
  );
};

export default App;
