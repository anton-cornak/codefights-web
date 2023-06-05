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
				<div className="">
					<div>
						<Image
							className="mx-auto flex items-center justify-center rounded-xl opacity-60 "
							src="/intro.jpg"
							alt="dsadsa"
							width={750}
							height={650}
						/>
					</div>

					<div className="absolute xl:left-64 md:left-10 sm:left-0 top-60 mt-12 xl:text-8xl md:text-7xl sm:text-7xl">
						<h1>VISMA</h1>
					</div>

					<div className="absolute xl:left-80 md:left-24 sm:left-14 top-72 mt-24 xl:text-8xl md:text-7xl sm:text-7xl">
						<h1>WARS</h1>
					</div>

					<div className="absolute xl:right-64 md:right-10 sm:right-0 flex top-40 xl:w-[25rem] md:w-[15rem] sm:w-[15rem] items-center text-right xl:text-4xl md:text-3xl sm:text-2xl">
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
					<div className=" items-center text-center xl:text-8xl md:text-7xl sm:text-6xl">
						<p>LANGUAGES</p>
					</div>

					<div className="text-color2 xl:mr-96 md:mr-10 sm:mr-0 text-right text-2xl ">
						<p>FIREBASE-POWERED.</p>
					</div>
					{
						<div className="flex w-full justify-around xl:px-24 md:px-10 sm:px-0">
							<div className="flex flex-col gap-10">
								<div className=" mt-24 xl:text-4xl md:text-3xl sm:text-2xl">
									<ul>
										<li>• PYTHON</li>
										<li>• JAVA</li>
										<li>• GO LANG</li>
										<li>• C#</li>
									</ul>
								</div>

								<div className=" w-[35rem] text-left xl:text-4xl md:text-3xl sm:text-2xl">
									<p>
										CODING IS NOT A SOLITARY ACTIVITY, ITS A
										TEAM SPORT. COLLABORATION IS KEY TO SUCCESS.
									</p>
								</div>
							</div>

							<div>
								<Image
									className="rounded-xl my-5 opacity-60"
									src="/languages.jpg"
									alt="dsadsa"
									width={550}
									height={650}
								/>
							</div>

						</div>}

					<StraightLine />
				</div>
				{/* LANGUAGES */}

				{/* YOUR GOAL */}
				<div>
					<div className="text-center xl:text-8xl md:text-7xl sm:text-6xl">
						<p>YOUR GOAL</p>
					</div>

					<div className="grid grid-cols-2 grid-rows-2 place-items-center xl:text-4xl md:text-3xl sm:text-2xl">
						<div className="xl:pl-60 md:pl-10 sm:pl-0">
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

						<div className="xl:pr-60 md:pr-10 sm:pr-0 text-right">
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
