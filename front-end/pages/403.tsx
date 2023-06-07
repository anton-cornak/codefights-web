// pages/403.tsx
import React from "react";

import { NextPage } from "next";
import Link from "next/link";

const Custom403: NextPage = () => {
	return (
		<div className="container">
			<div className="grid min-h-screen place-content-center">
				<div className="flex flex-col items-center">
					<div className="my-4 text-center">
						<h1 className="text-2xl">403 - Unauthorized</h1>
						<p className="">Please login as admin</p>
					</div>
					<Link className="btn btn-primary" href="/signin">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Custom403;
