import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "next-themes";
import '@fontsource/bruno-ace-sc';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
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
