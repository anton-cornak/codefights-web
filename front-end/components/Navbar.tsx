import React, { useState } from "react";

import Link from "next/link";
import { buttonVariants } from "./Button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = (): JSX.Element => {
	const { data: session } = useSession();

	const user = session?.user;

	const [active, setActive] = useState(false);

	const handleClick = () => {
		setActive(!active);
	};

	return (
		<div className="sticky left-0 right-0 top-0 z-50 flex h-20 w-full border-b-[0.1rem] border-slate-300 bg-white/75 shadow-sm backdrop-blur-sm dark:border-slate-600 dark:bg-black ">
			<div className="container flex items-center justify-start gap-5">
				<Link href="/">
					<Image
						className=" left-0 h-[2.5remw] w-[2.5rem]"
						src="/gulicka.png"
						alt="Logo"
						width={50}
						height={50}
					/>
				</Link>

				<Link
					href="/upcomingEvents"
					className={buttonVariants({ variant: "link" })}
				>
					UPCOMING_EVENTS
				</Link>

				<Link
					href="/latestevents"
					className={buttonVariants({ variant: "link" })}
				>
					LATEST_EVENTS
				</Link>

				<Link
					href="/leaderboard"
					className={buttonVariants({ variant: "link" })}
				>
					LEADERBOARD
				</Link>
			</div>

			<div className="container flex w-64 items-center justify-center">
				<div className="hidden gap-4  uppercase md:flex">
					<Link
						className={buttonVariants({ variant: "default" })}
						href="/registration"
					>
						register
					</Link>
					{user ? (
						<>
							<button
								className={buttonVariants({
									variant: "default",
								})}
								onClick={() => signOut()}
							>
								Sign Out
							</button>
						</>
					) : (
						<Link
							className={buttonVariants({ variant: "default" })}
							href="/signin"
						>
							login
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
