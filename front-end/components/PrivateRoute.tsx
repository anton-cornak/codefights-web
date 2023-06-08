import { useState } from "react";
import { useRouter } from "next/router";
import User from "../pages/user";
import Login from "../pages/login";
import NoPage from "../pages/403";
import Admin from "../pages/admin";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const userRole = localStorage.getItem("role");

  if (!isLoggedIn) {
    // User is not logged in, redirect to the login page
    router.push("/login");
    return null;
  }

  // User is logged in, render the component
  return <>{children}</>;
};

function App() {
  return (
    <div>
      <Login />
      <PrivateRoute>
        <User />
      </PrivateRoute>
      {localStorage.getItem("role") === "ADMIN" && (
        <PrivateRoute>
          <Admin />
        </PrivateRoute>
      )}
      <NoPage />
    </div>
  );
}

export default App;
