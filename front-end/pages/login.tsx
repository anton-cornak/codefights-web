import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginUrl: string = process.env.NEXT_PUBLIC_LOGIN_URL!;
        
    try {
      const response = await axios.post(loginUrl, {
        username: username,
        password: password,
      });

      const token = response.data.token;
      const role = response.data.role;
      const usernameFromBackend = response.data.username;
      localStorage.setItem("token", token);
      localStorage.setItem("username", usernameFromBackend);
      localStorage.setItem("role", role);

      alert("you are logged in");
      // Do something with the token or navigate to a different page

      if (role === "USER") {
        router.push("/user");
      } else if (role === "ADMIN") {
        router.push("/admin");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Wrong username or password!");
      // Handle error, show error message, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="border-solid border-2 border-indigo-600"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      {errorMessage && <p className="error text-red-600"> {errorMessage} </p>}
      <button type="submit">Login</button>
      <LogoutButton />
    </form>
  );
};

export default LoginForm;
