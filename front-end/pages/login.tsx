import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";
import BoxShadowImage from "../components/BoxShadowImage";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginUrl: string = process.env.NEXT_PUBLIC_LOGIN_URL!;

    try {
      setLoading(true);
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

      if (role === "USER" || role === "ADMIN") {
        router.push("/eventsNEW");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Wrong username or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:flex">
      <div className="p-8">
        <form onSubmit={handleSubmit} className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white">
          <h1 className="text-5xl text-black dark:text-white">Login</h1>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium text-black dark:text-white mt-6">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium text-black dark:text-white">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          {errorMessage && <p className="error text-red-600"> {errorMessage} </p>}
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-black dark:text-white bg-custom_light_grey rounded-sm hover:bg-custom_green focus:outline-none focus:ring-2 focus:ring-custom_green"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <LogoutButton />
        </form>
      </div>
      <div className="md:shrink-0 mr-16 mt-0 ml-16">
        <BoxShadowImage alt="Example Image" src="registrationImage.jpg" width={450} height={350} />
      </div>
    </div>
  );
};

export default LoginForm;



