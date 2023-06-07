import React from "react";

interface RankLineProps {
	position: string;
	teamName: string;
	score: string;
}
const RankLine = ({
	position,
	teamName,
	score,
}: RankLineProps): JSX.Element => {
	return (
		<div className="my-3 inline-flex xl:gap-40 md:gap-6 sm:gap-0">
			<div className="flex text-3xl">
				<h1>{position}</h1>
			</div>
			<div className="text-1xl border-color2 flex w-[15rem] border-b-2 border-l-2 pl-3 pt-2">
				<p>{teamName}</p>
			</div>
			<div className="text-1xl border-color2 flex w-[5rem] border-b-2 border-r-2 pl-8 pt-2">
				<p>{score}</p>
			</div>
		</div>
	);
};
export default RankLine;
