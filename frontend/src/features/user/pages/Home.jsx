import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      user
      <ul>
        <li>{user.name}</li>
        <li>{user.email}</li>
        <li>{user.role}</li>
      </ul>
    </div>
  );
};

export default Home;
