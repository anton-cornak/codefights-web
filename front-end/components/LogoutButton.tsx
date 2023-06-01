import React from "react";
import axios from "axios";
import { buttonVariants } from "../components/Button";
import router from "next/router";

const LogoutButton = () => {
  const handleLogout = async () => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    try {
      await axios.post(`http://localhost:8080/logout/${username}`, null, {
        headers: {
          Token: `Bearer ${token}`,
        },
      });

      alert("logged out successfully");
      router.push("/login");

      // Clear the token and perform any additional actions upon successful logout
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      //   localStorage.clear();

      //refresni inak sa localstorage nevycisti
      window.location.reload();

      console.log("LocalStorage items removed");
      // Additional logout actions...
    } catch (error) {
      console.error(error);
      // Handle error, show error message, etc.
    }
  };

  return <button className={buttonVariants({ variant: 'default' })} onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
