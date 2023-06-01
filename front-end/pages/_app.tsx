
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "next-themes";
import '@fontsource/bruno-ace-sc';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
       <div className="h-screen w-screen flex flex-col items-center justify-center  bg-white dark:bg-black" style={{ fontFamily: 'Bruno Ace SC, sans-serif' }}>
      <ThemeProvider attribute="class">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
        <Component {...pageProps} />
        </ThemeProvider>
        </div>
    </>
  );
}
