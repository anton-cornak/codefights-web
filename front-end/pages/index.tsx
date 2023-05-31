import React from "react";
import "../pages/";
import StraightLine from "@/components/StraightLine";
import Image from "next/image";
import { buttonVariants } from "@/components/Button";
import Link from "next/link";

export default function Home(): JSX.Element {
	return (
		<div className=" font-bruno relative h-screen">
			<div className=" bg-bgBlack text-color1">

				{/* INTRO */}
				<div>
					<div>
						<Image
							className="mx-auto flex items-center justify-center rounded-xl opacity-60 "
							src="/intro.jpg"
							alt="dsadsa"
							width={750}
							height={650}
						/>
					</div>

					<div className=" absolute left-64 top-60 mt-12 text-8xl ">
						<h1>VISMA</h1>
					</div>

					<div className="absolute left-80 top-72 mt-24 text-8xl">
						<h1>WARS</h1>
					</div>

					<div className="absolute right-64 flex top-40 w-[25rem] items-center text-right text-4xl">
						<p>
							TEAMWORK IS ESSENTIAL IN CODING. TOGETHER WE CAN
							SOLVE COMPLEX PROBLEMS THAT SEEMS IMPOSSIBLE TO
							SOLVE ALONE.
						</p>
					</div>

					<StraightLine />
				</div>
				{/* INTRO */}

				{/* LANGUAGES */}
				<div>
					<div className=" items-center text-center text-8xl">
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
					<div className="text-center text-8xl">
						<p>YOUR GOAL</p>
					</div>

					<div className="grid grid-cols-2 grid-rows-2 place-items-center text-4xl">
						<div className="pl-60">
							<p>
								JOIN FORCES WITH YOUR TEAM TO SOLVE OUR
								PROGRAMMING PROBLEMS, AND COMPETE AGAINST OTHER
								TEAMS ON OUR LEADERBOARD TO EARN RECOGNITION AS
								A TOP TEAM.
							</p>
						</div>

						<div>
							<Image
								className="rounded-xl opacity-60 "
								src="/yourGoalRight.jpg"
								alt="dsadsa"
								width={450}
								height={400}
							/>
						</div>

						<div>
							<Image
								className=" rounded-xl opacity-60"
								src="/yourGoalLeft.jpg"
								alt="dsadsa"
								width={450}
								height={400}
							/>
						</div>

						<div className="pr-60">
							<p>
								PUT YOUR CODING SKILLS TO THE TEST WITH OUR
								PLATFORM’S PROGRAMMING PROBLEMS AND WORK WITH
								OTHERS TO FIND SOLUTIONS.
							</p>
						</div>
					</div>
				</div>

				<StraightLine />
			</div>
			{/* YOUR GOAL */}

			{/* REGISTRATINON */}
			<div className=" bg-bgBlack">
				<div className="py-4 text-center text-4xl text-color2 ">
					<p>ARE YOU READY?</p>
				</div>

				<div className="flex items-center justify-center pb-5">
					<Link className={buttonVariants({ variant: 'default' })}
						href='/registration'>
						<h1 className="px-24 text-center text-4xl">register</h1>
					</Link>
				</div>
			</div>
			{/* REGISTRATION */}
		</div>

	);
}
