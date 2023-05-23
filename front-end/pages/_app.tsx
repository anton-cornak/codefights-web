
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class">
      <SessionProvider>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
        <Component {...pageProps} />
        </SessionProvider>
        </ThemeProvider>
    </>
  );
}
