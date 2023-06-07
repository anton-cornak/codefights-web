import React from "react";
import Popup from "@/components/Popup";
import Paragraph from "@/components/ui/LargeHeading";
import LargeHeading from "@/components/ui/LargeHeading";
import Image from "next/image";
import { useState } from "react";

export default function UpcomingEvents(): JSX.Element {
	const [showPopup, setShowPopup] = useState(false);
	const [location, setLocation] = useState("csharp");

	const handleButtonClick = (language: string) => {
		setLocation(language);
		setShowPopup(true);
	};

	const handleClosePopup = () => {
		setShowPopup(false);
	};

	return (
		<>
			<div className=" font-bruno relative h-screen overflow-x-hidden bg-black">
				<div className=" text-color1 items-center py-3 text-center text-6xl">
					<p>UPCOMING EVENTS</p>
				</div>

				<div className="inline-flex w-full items-center justify-center">
					<hr className="bg-color1 dark:bg-color1 h-px w-[85rem] border-0 "></hr>
				</div>

				<div className="h-50 grid grid-cols-2 grid-rows-2 pl-20 pr-20">
					<a
						onClick={() => handleButtonClick("csharp")}
						className="cursor-pointer"
					>
						<div className="grid grid-cols-2 py-5">
							<div>
								<Image
									className="flex rounded-xl  opacity-60"
									src="/characters/jaro.jpg"
									alt="jaro"
									width={300}
									height={300}
								/>
							</div>
							<div>
								<LargeHeading size={"lg"} className="py-3">
									C# #1
								</LargeHeading>
								<Paragraph
									size={"sm"}
									className="text-left font-thin"
								>
									example of description
								</Paragraph>
							</div>
						</div>
					</a>
					<a
						onClick={() => handleButtonClick("python")}
						className="cursor-pointer"
					>
						<div className="grid grid-cols-2 py-5">
							<div>
								<Image
									className="flex rounded-xl opacity-60"
									src="/characters/zena.jpg"
									alt="jaro"
									width={300}
									height={300}
								/>
							</div>

							<div>
								<LargeHeading size={"lg"} className="py-3">
									Python #1
								</LargeHeading>

								<Paragraph
									size={"sm"}
									className="text-left font-thin"
								>
									example of description
								</Paragraph>
							</div>
						</div>
					</a>
				</div>

				{showPopup && (
					<Popup onClose={handleClosePopup} location={location} />
				)}
			</div>
		</>
	);
}
