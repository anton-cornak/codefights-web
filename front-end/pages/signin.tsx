import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import BoxShadowImage from "@/components/BoxShadowImage";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { buttonVariants } from "@/components/Button";
import Link from "next/link";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const callbackUrl = decodeURI((router.query?.callbackUrl as string) ?? "/");
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
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
          {/* <div className="mt-4 mb-0 uppercase tracking-wide text-3xl text-grey-700 font-semibold text-center"> */}
            <h1 className="text-5xl text-black dark:text-white text-center">
            login
          </h1>
        {/* </div> */}
        <form
          className="block mt-10 text-lg leading-tight font-medium text-black hover:text-grey-700"
          onSubmit={handleSubmit}
        >
          {!!error && <p className="text-error">ERROR: {error}</p>}
          <div className="relative">
            <input
              type="text"
              className="ml-16 px-3 py-2 border rounded-lg w-3/4 focus:outline-none focus:ring-2 focus:ring-gray-600"
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
              className="ml-16 mt-4 px-3 py-2 border rounded-lg w-3/4 focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {showPassword ? (
              <FontAwesomeIcon
                icon={faEyeSlash}
                onClick={() => setShowPassword(!showPassword)}
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
                onClick={() => setShowPassword(!showPassword)}
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
            <div className="ml-56">
          <button type="submit" className={buttonVariants({ variant: 'default' })}>
            Login
              </button>
              <Link
                  href="/registration"
                  className="mt-2 sm:mt-0 sm:ml-2 px-4 py-2 text-sm font-medium text-black dark:text-white hover:text-custom_green"
                ><br/>
                  Not registered yet?
                </Link>
              </div>
        </form>
      </div>
      <div className="md:shrink-0 mr-16 ml-16">
        <BoxShadowImage
          alt="Example Image"
          src="loginImage.jpg"
          width={450}
          height={350}
        />
      </div>
    </div>
  </div>
);
}

export default SignInPage;