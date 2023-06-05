import React from "react";
import Link from "next/link";
import ScorePoints from "@/components/Score/ScorePoints";
import '../pages';
import { buttonVariants } from "@/components/Button";

interface ScorePointsProps {
    score: string
}
interface completedTasksProps {
    completedTasksData: [ScorePointsProps]
}
export default function completedTasks({ completedTasksData }: completedTasksProps): JSX.Element {
    return (
        <div className="bg-bgBlack h-screen xl:text-8xl md:text-5xl sm:text-4xl font-bruno">
            <div className="flex justify-center text-color1 pt-40">
                <h1>EVENT COMPLETED</h1>
            </div>

            <div className="flex justify-center text-color1 my-8">
                <h1>YOU EARNED</h1>
            </div>

            {completedTasksData.map((rank, index) => (
                <div key={index} className="flex justify-center my-8">
                    <ScorePoints score={rank.score} />
                    <h1 className="text-color1"> pts.</h1>
                </div>
            ))}
            <div className="flex items-center justify-center mt-20">
                <Link className={buttonVariants({ variant: 'default' })}
                    href='/'>
                    <h1 className="px-auto text-center text-4xl">return home</h1>
                </Link>
            </div>
            <div className=" text-gray-900 bg-black flex justify-center mt-20">
                <h1 className="xl:text-2xl sm:text-lg">THIS PROJECT IS CREATED BY STUDENTS FROM KASV</h1>
            </div>
        </div>
    );
}
completedTasks.defaultProps = {
    completedTasksData: [
        {
            score: "value"
        },
    ],
}

