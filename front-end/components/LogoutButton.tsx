import React, { useState, useEffect } from "react";
import axios from "axios";
import { buttonVariants } from "../components/Button";
import router from "next/router";

const LogoutButton = () => {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const logoutUrl = process.env.NEXT_PUBLIC_LOGOUT_URL + `/${username}`;

    try {
      await axios.post(logoutUrl, null, {
        headers: {
          Token: `Bearer ${token}`,
        },
      });

      // Perform any additional actions upon successful logout
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
    } catch (error) {
      console.error(error);
      // Handle error, show error message, etc.
    } finally {
      setLoggingOut(false); // Reset the loggingOut state to false
    }
  };

  useEffect(() => {
    if (loggingOut) {
      // Redirect to /login after logging out
      router.push("/login");
    }
  }, [loggingOut]);

  return (
    <button
      className={buttonVariants({ variant: "default" })}
      onClick={handleLogout}
      disabled={loggingOut} // Disable the button during the logout process
    >
      {loggingOut ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
