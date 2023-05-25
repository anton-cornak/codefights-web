import Button, { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import TextAnimation from "@/components/ui/TextAnimation";
import axios from "axios";
import type { Metadata } from "next";
import { useState } from "react";

export const metadata: Metadata = {
	title: "VISMA WARS",
	description: "KASV project for Vsima employees",
};

const HandleSubmitTask = async (codeSnippet: string) => {
	const asciiString = codeSnippet;
	const encodedAsciiString = btoa(asciiString);
	console.log(encodedAsciiString);

	try {
		const url = "http://10.11.65.63:9090/submit-task";
		const data = {
			language: "csharp",
			method: "challenge1",
			code: encodedAsciiString,
		};

		const headers = {
			"Content-Type": "application/json",
			teamname: "marek",
		};
		const response = await axios.post(url, data, { headers });
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
};

export default function Events() {
	const [inputValue, setInputValue] = useState("");

	const handleChange = (event: any) => {
		const newValue = event.target.value;
		setInputValue(newValue);
	};
	return (
		<>
			<div className=" relative h-screen overflow-x-hidden bg-black">
				<div className="container flex h-fit w-full flex-col items-center justify-start">
					{/* LOGO x Description */}
					<div className=" flex flex-col items-center justify-center gap-6 pt-20 text-center lg:justify-center">
						<LargeHeading
							size="lg"
							className="font-bruno three-d text-green dark:text-green"
						>
							VISMA WARS
						</LargeHeading>

						<TextAnimation />
					</div>

					<div className="w-full flex flex-col gap-4 items-end h-[40rem]">
						<div className="w-full grid grid-cols-2 gap-4 flex-1">
							<div
								className="grid-span-2 mx-right focus:ring-green focus:border-green resize-none appearance-none overflow-auto rounded border bg-gray-800  px-2 leading-tight text-slate-100 shadow focus:shadow-inner"
							>
								<h1 className="text-2xl font-bold">Challenge 1:</h1>
								<p className="">Convert abdc to 1234</p>
							</div>
							<div className="flex w-full flex-col gap-4 flex-1">
								<textarea
									placeholder="// input your solution"
									className="h-full grid-span-2 mx-right focus:ring-green focus:border-green resize-none appearance-none overflow-auto rounded border bg-gray-800  px-2 leading-tight text-slate-100 shadow focus:shadow-inner"
									value={inputValue}
									onChange={handleChange}
								/>
								<textarea placeholder="tests"
									className="h-full w-full mx-left focus:ring-green focus:border-green w-1/2 resize-none appearance-none overflow-auto rounded border bg-gray-800  px-2 leading-tight text-slate-100 shadow focus:shadow-inner"
								 />
							</div>
						</div>
						<div className="flex gap-2">
						<Button className={"w-fit" + buttonVariants({ variant: "outline" })}
								onClick={() => {
									HandleSubmitTask(inputValue);
								}}>
								RUN
							</Button>
							<Button
								className={"w-fit " + buttonVariants({ variant: "default" })}
								onClick={() => {
									HandleSubmitTask(inputValue);
								}}>
								SEND
							</Button>
						</div>
					</div>
				</div>




			</div>
		</>
	);
}
