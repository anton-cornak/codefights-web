// pages/admin.tsx
import React from "react";

import Link from "next/link";
import { signOut } from "next-auth/react";

const AdminPage = (): JSX.Element => {
	return (
		<div className="container">
			<div className="grid min-h-screen place-content-center">
				<div className="flex flex-col gap-4">
					<h1 className="text-4xl">Admin Page</h1>

					<Link className="btn btn-primary" href="/">
						Go to Index Page
					</Link>
					<button
						className="btn btn-accent btn-outline"
						onClick={() => signOut()}
					>
						Sign Out
					</button>
				</div>
			</div>
		</div>
	);
};

export default AdminPage;
