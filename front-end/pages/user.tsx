import { useEffect } from "react";
import { useRouter } from "next/router";

const User = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("token");

    if (!isLoggedIn) {
      // User is not logged in, redirect to the login page
      router.push("/login");
    }
  }, []);

  return <div>User Component</div>;
};

export default User;
