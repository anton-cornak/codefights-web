import Link from "next/link";
import ScorePoints from "@/components/Score/ScorePoints";
import '../pages';

interface ScorePointsProps {
    score: string
}
interface completedTasksProps {
    completedTasksData: [ScorePointsProps]
}
export default function completedTasks({ completedTasksData }: completedTasksProps): JSX.Element {
    return (
        <div className="bg-bgBlack h-screen text-6xl">
            <div className="flex justify-center text-color1 pt-20">
                <h1>EVENT COMPLETED</h1>
            </div>

            <div className="flex justify-center text-color1 my-5">
                <h1>YOU EARNED</h1>
            </div>


            {completedTasksData.map((rank, index) => (
                <div key={index} className="flex justify-center my-5">
                    <ScorePoints score={rank.score} />
                </div>
            ))}


            <div className="flex justify-center my-5">
                <h1>value pts.</h1>
            </div>

            <div className="flex justify-center my-5">
                <h1>TIME - vlaue</h1>
            </div>

            <div className="flex justify-center items-center mt-20">
                <button className="rounded-sm bg-color2 text-2xl text-center inline-flex items-center px-16">
                    <Link href="/">RETURN HOME</Link>
                </button>
            </div>


        </div>
    );
}
completedTasks.defaultProps = {
    leaderboardData: [
        {
            position: "1"
        },
    ],
}

