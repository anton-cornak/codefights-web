
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
      <Head>
        <title>VISMA WARS</title>
        <link rel="icon" href="/gulicka.png" />
      </Head>
      <Navbar />
        <Component {...pageProps} />
        </SessionProvider>
    </>
  );
}
