import Button, { buttonVariants } from "@/components/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import TextAnimation from "@/components/ui/TextAnimation";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const HandleGetTask = async (router: any) => {

	try {
		const url = process.env.NEXT_PUBLIC_API_URL1 ?? "";
		const headers = {
			language: router.query.events,
		};

		const response = await axios.get(url, { headers });
		return response.data[Math.floor(Math.random() * response.data.length)].task;
	} catch (error) {
		console.error(error);
	}

	return "null";
}

const HandleSubmitTask = async (codeSnippet: string) => {
	const asciiString = codeSnippet;
	const encodedAsciiString = btoa(asciiString);

	try {
		const url = process.env.NEXT_PUBLIC_API_URL2 ?? "";
		const data = {
			id:3,
			language: window.location.href.split("/")[4],
			method: "challenge1",
			code: encodedAsciiString,
		};

		const headers = {
			"Content-Type": "application/json",
			teamname : "marek",

		};

		const response = await axios.post(url, data, { headers });
		return response.data.Passed+" Tests passed! [SUCCESSFUL]";
	} catch (error) {
		return "[FAILED] 0 Tests passed!"
	}
	
};



export default function Events() {
	const [inputValue, setInputValue] = useState("");
	const [data, setChallengeData] = useState("null");
	const router = useRouter();
	const [response,setResponse] = useState("");

	const handleChange = (event: any) => {
		const newValue = event.target.value;
		setInputValue(newValue);
	};

	const submit = (codeSnippet: string) => {
		HandleSubmitTask(codeSnippet).then(res => setResponse(res))
	}

	useEffect(() => {
		HandleGetTask(router).then(
			data => setChallengeData(data)
		)
	}, [router])
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

								{
									data === "null" ? 
									<ClipLoader className=""
										color={"#ffffff"}
										loading={true}
										size={60}
										aria-label="Loading Spinner"
										data-testid="loader"
									/> : data
								}
							</div>
							<div className="flex w-full flex-col gap-4 flex-1">
								<textarea
									placeholder="// input your solution"
									className="h-full grid-span-2 mx-right focus:ring-green focus:border-green resize-none appearance-none overflow-auto rounded border bg-gray-800  px-2 leading-tight text-slate-100 shadow focus:shadow-inner"
									value={inputValue}
									onChange={handleChange}
								/>
								<textarea placeholder="tests"
									className="h-full w-full mx-left focus:ring-green focus:border-green resize-none appearance-none overflow-auto rounded border bg-gray-800  px-2 leading-tight text-slate-100 shadow focus:shadow-inner"
									value={response}
								/>
							</div>
						</div>
						<div className="flex gap-2">
							<Button className={"w-fit" + buttonVariants({ variant: "outline" })}
								>
								RUN
							</Button>
							<Button
								className={"w-fit " + buttonVariants({ variant: "default" })}
								onClick={() => {
									submit(inputValue);
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
