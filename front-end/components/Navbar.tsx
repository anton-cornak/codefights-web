import Link from "next/link";
import { buttonVariants } from "./Button";
import { useState, useEffect } from "react";
import Toggle from "../components/Toggle";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
	const [active, setActive] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const checkAuthentication = () => {
		const token = localStorage.getItem("token");
		const username = localStorage.getItem("username");
		const role = localStorage.getItem("role");

		// Check if the token and other necessary data exist
		if (token && username && role) {
			return true; // User is authenticated
		} else {
			return false; // User is not authenticated
		}
	};

	useEffect(() => {
		// Call the checkAuthentication function
		const authenticated = checkAuthentication();
		setIsAuthenticated(authenticated);
	}, []);

	return (
		<div className="sticky left-0 right-0 top-0 z-50 flex h-20 w-full items-center justify-center border-b border-slate-300 bg-white/75 shadow-sm backdrop-blur-sm dark:border-slate-600 dark:bg-black">
			<div className="max-width-7xl container mx-auto flex w-full items-center justify-center">
				<Link href="/" passHref>
					<button className={buttonVariants({ variant: "link" })}>
						HOME
					</button>
				</Link>

				<Link href="/eventsNEW" passHref>
					<button className={buttonVariants({ variant: "link" })}>
						EVENTS
					</button>
				</Link>

				<Link href="/leaderboard" passHref>
					<button className={buttonVariants({ variant: "link" })}>
						LEADERBOARD
					</button>
				</Link>
			</div>

			<div className="max-width-7xl container mx-auto flex w-full items-center justify-center">
				<div className="hidden gap-4 uppercase md:flex">
					<Link href="/registration" passHref>
						<button
							className={buttonVariants({ variant: "default" })}
						>
							register
						</button>
					</Link>
					{isAuthenticated ? (
						<LogoutButton />
					) : (
						<Link href="/login" passHref>
							<button
								className={buttonVariants({
									variant: "default",
								})}
							>
								login
							</button>
						</Link>
					)}
					<Toggle />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
