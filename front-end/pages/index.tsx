import React from "react";
import "../pages/";
import StraightLine from "@/components/StraightLine";
import Image from "next/image";

export default function Home(): JSX.Element {
	return (
		<div className=" relative h-screen overflow-x-hidden bg-black">
			<div className=" bg-bgBlack text-color1">
				{/* INTRO */}
				<div>
					<div className=" ">
						<Image
							className="mx-auto flex items-center justify-center rounded-xl opacity-60 "
							src="/intro.jpg"
							alt="dsadsa"
							width={750}
							height={650}
						/>

						<div className=" absolute left-24 top-80 mt-12 text-9xl ">
							<h1>VISMA</h1>
						</div>

						<div className="absolute left-40 top-96 mt-24 text-9xl">
							<h1>WARS</h1>
						</div>

						<div className="absolute right-0 top-48 mr-24 flex h-full w-[25rem] items-center text-right text-4xl">
							<p>
								TEAMWORK IS ESSENTIAL IN CODING. TOGETHER WE CAN
								SOLVE COMPLEX PROBLEMS THAT SEEMS IMPOSSIBLE TO
								SOLVE ALONE.
							</p>
						</div>
					</div>

					<StraightLine />
				</div>
				{/* INTRO */}

				{/* LANGUAGES */}
				<div>
					<div className=" items-center text-center text-9xl">
						<p>LANGUAGES</p>
					</div>

					<div className="text-color2 mr-96 text-right text-2xl ">
						<p>FIREBASE-POWERED.</p>
					</div>

					<div className="flex w-full justify-around px-24">
						<div className="flex flex-col gap-10">
							<div className=" mt-24 text-4xl">
								<ul>
									<li>• PYTHON</li>
									<li>• JAVA</li>
									<li>• GO LANG</li>
									<li>• C#</li>
								</ul>
							</div>

							<div className=" w-[35rem] text-left text-4xl">
								<p>
									CODING IS NOT A SOLITARY ACTIVITY, ITS A
									TEAM SPORT. COLLABORATION IS KEY TO SUCCESS.
								</p>
							</div>
						</div>

						<Image
							className="right-0 flex items-end justify-end rounded-xl py-5 opacity-60"
							src="/languages.jpg"
							alt="dsadsa"
							width={550}
							height={650}
						/>
					</div>

					<StraightLine />
				</div>
				{/* LANGUAGES */}

				{/* YOUR GOAL */}
				<div>
					<div className="text-center text-9xl">
						<p>YOUR GOAL</p>
					</div>

					<div className="flex w-full justify-around px-24 py-5">
						<div className="mt-28 pr-40 text-left first:text-4xl">
							<p>
								JOIN FORCES WITH YOUR TEAM TO SOLVE OUR
								PROGRAMMING PROBLEMS, AND COMPETE AGAINST OTHER
								TEAMS ON OUR LEADERBOARD TO EARN RECOGNITION AS
								A TOP TEAM.
							</p>
						</div>

						<Image
							className="right-0 flex items-end justify-end rounded-xl opacity-60"
							src="/yourGoalRight.jpg"
							alt="dsadsa"
							width={450}
							height={400}
						/>
					</div>

					<div className="flex w-full justify-around px-24">
						<Image
							className="left-0 flex items-start justify-start rounded-xl opacity-60"
							src="/yourGoalLeft.jpg"
							alt="dsadsa"
							width={450}
							height={400}
						/>

						<div className="right-0 mt-28 flex pl-40 text-right text-4xl ">
							<p>
								PUT YOUR CODING SKILLS TO THE TEST WITH OUR
								PLATFORM’S PROGRAMMING PROBLEMS AND WORK WITH
								OTHERS TO FIND SOLUTIONS.
							</p>
						</div>
					</div>

					<StraightLine />
				</div>
				{/* YOUR GOAL */}

				{/* REGISTRATINON */}
				<div className="">
					<div className="my-4 text-center text-4xl ">
						<p>ARE YOU READY?</p>
					</div>

					<div className="flex items-center justify-center pb-5">
						<button className="bg-color2 inline-flex items-center rounded-sm px-36 text-center text-4xl">
							<p className="text-bgBlack">REGISTER</p>
						</button>
					</div>
				</div>
				{/* REGISTRATION */}
			</div>
		</div>
	);
}
