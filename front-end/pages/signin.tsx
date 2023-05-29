import React, { useState } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import BoxShadowImage from "@/components/BoxShadowImage";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { buttonVariants } from "@/components/Button";

const SignInPage = (): JSX.Element => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const callbackUrl = decodeURI((router.query?.callbackUrl as string) ?? "/");
	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault();
		const result = await signIn("credentials", {
			email,
			password,
			callbackUrl: callbackUrl ?? "/",
			redirect: false,
		});
		if (result?.error) {
			setError(result.error);
		}
		if (result?.ok) {
			router.push(callbackUrl);
		}
	};

	return (
		<div>
			<div className="md:flex">
				<div className="p-8">
					<div className="text-grey-700 mb-0 mt-4 text-center text-3xl font-semibold uppercase tracking-wide">
						login
					</div>
					<form
						className="hover:text-grey-700 mt-20 block text-lg font-medium leading-tight text-black"
						onSubmit={handleSubmit}
					>
						{!!error && (
							<p className="text-error">ERROR: {error}</p>
						)}
						<div className="relative">
							<input
								type="text"
								className="ml-16 mt-0 w-3/4 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
								placeholder="email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								className="ml-16 mt-4 w-3/4 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
								placeholder="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
							{showPassword ? (
								<FontAwesomeIcon
									icon={faEyeSlash}
									onClick={() =>
										setShowPassword(!showPassword)
									}
									style={{
										position: "absolute",
										top: "50%",
										right: "30px",
										transform: "translateY(-50%)",
										cursor: "pointer",
									}}
								/>
							) : (
								<FontAwesomeIcon
									icon={faEye}
									onClick={() =>
										setShowPassword(!showPassword)
									}
									style={{
										position: "absolute",
										top: "60%",
										right: "10%",
										transform: "translateY(-50%)",
										cursor: "pointer",
									}}
								/>
							)}
						</div>

						<br />
						<div className="ml-48">
							<button
								type="submit"
								className={buttonVariants({
									variant: "default",
								})}
							>
								Login
							</button>
						</div>
					</form>
				</div>
				<div className="ml-16 mr-16 mt-10 md:shrink-0">
					<BoxShadowImage
						alt="Example Image"
						src="loginImage.jpg"
						width={350}
						height={350}
					/>
				</div>
			</div>
		</div>
	);
};

export default SignInPage;
