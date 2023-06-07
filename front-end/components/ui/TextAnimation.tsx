import React, { useEffect } from "react";
import Paragraph from "@/components/ui/Paragraph";

function addAnimation(): void {
	const textElements = document.querySelectorAll(".text-animation");

	for (let i = 0; i < textElements.length; i++) {
		setTimeout(() => {
			const textElement = textElements[i];
			const textContent = textElement?.textContent;
			if (!textContent) return;
			const arr = textContent.split(" ");
			textElement.textContent = "";

			let counter = 0;
			arr.forEach((word, index) => {
				counter++;
				word.split("").forEach((char, index) => {
					const span = document.createElement("span");
					span.textContent = char;
					span.style.animationDelay = `${index * 0.04}s`;
					textElement.appendChild(span);
				});

				if (counter != arr.length) {
					textElement.innerHTML =
						textElement.innerHTML + "&nbsp;&nbsp;";
				}
			});
		}, i * 500); // Nastavte oneskorenie pre každý riadok
	}
}

function TextAnimation(): JSX.Element {
	useEffect((): void => {
		addAnimation();
	}, []);

	return (
		<div>
			<Paragraph size={"lg"} className="font-bruno text-animation">
				TEAMWORK IS ESSENTIAL
			</Paragraph>
		</div>
	);
}

export default TextAnimation;
