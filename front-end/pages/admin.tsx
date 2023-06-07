import { useEffect } from "react";
import { useRouter } from "next/router";
import CreateEvent from "@/components/CreateEvent";

const Admin = () => {
	const router = useRouter();

	useEffect(() => {
		const isLoggedIn = !!localStorage.getItem("token");
		const userRole = localStorage.getItem("role");

		if (!isLoggedIn) {
			// User is not logged in, redirect to the login page
			router.push("/login");
		} else if (userRole !== "ADMIN") {
			// User role doesn't match the required role for the route, redirect to unauthorized page
			router.push("/403");
		}
	}, []);

	return (
		<>
			<CreateEvent />
		</>
	);
};

export default Admin;
