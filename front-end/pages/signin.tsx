import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import BoxShadowImage from "components/BoxShadowImage";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        <div className="flex">
               {/* lava cast obrazovky */}
                <div className="flex-1"> 
            <h1 className="text-5xl text-left ml-48 mt-28 text-gray-700">LOGIN</h1>
          <form className="card-body w-96 max-w-md mx-auto mt-8 ml-24" onSubmit={handleSubmit}>
            {!!error && <p className="text-error">ERROR: {error}</p>}
            <input
              type="text"
              className="input input-bordered mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="input input-bordered mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="btn" type="submit">
              Sign In
            </button>
          </form>
        </div>

                  {/* prava cast obrazovky */}
                <div className="w-1/3 mt-10 mr-48"> 
                  <div className="relative">
                    
<BoxShadowImage
        alt="Example Image"
        src="loginImage.jpg"
        width={350}
        height={350
        }
      />                           
    </div>
  </div>
      </div>
    </div>
  );
};

export default SignInPage;
