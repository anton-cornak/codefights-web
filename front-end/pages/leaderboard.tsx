import Description from '../components/LeaderBoard/Description'
import Head from '../components/LeaderBoard/Head'
import MiddleLine from '../components/LeaderBoard/MiddleLine'
import RankLine from '../components/LeaderBoard/RankLine'

import StraightLine from '../components/StraightLine'
import '../pages/'

interface RankLineProps {
    position: string,
    teamName: string,
    score: string
}

interface LeaderBoardProps {
    leaderboardData: [RankLineProps]
}
export default function LeaderBoard({ leaderboardData }: LeaderBoardProps): JSX.Element {
    return (


        <div className='bg-bgBlack'>
            {/* head */}
            <Head />
            {/* head */}

            <StraightLine />

            {/* top-name-score */}
            <Description />
            {/* top-name-score */}

            {/* rank from 1 to 20 (left->right side) */}


            {leaderboardData.map((rank, index) => (
                <div key={index} className='text-color1'>
                    <RankLine
                        position={rank.position}
                        teamName={rank.teamName}
                        score={rank.score}
                    />
                </div>
            ))}

            <div>

            </div>





            {/* rank from 1 to 20 (left->right side) */}


            {/* middle line*/}
            <MiddleLine />
            {/* middle line */}







        </div>


    );
}

LeaderBoard.defaultProps={
    leaderboardData:[
        {
            position: "1",
            teamName: "teamSUfurky",
            score:"109"
        },
        {
            position: "1",
            teamName: "teamSUfurky",
            score:"109"
        },
        {
            position: "1",
            teamName: "teamSUfurky",
            score:"109"
        },
        {
            position: "1",
            teamName: "teamSUfurky",
            score:"109"
        },
        {
            position: "1",
            teamName: "teamSUfurky",
            score:"109"
        },
        {
            position: "1",
            teamName: "teamSUfurky",
            score:"109"
        },
        {
            position: "1",
            teamName: "teamSUfurky",
            score:"109"
        },
        {
            position: "1",
            teamName: "teamSUfurky",
            score:"109"
        },
        {
            position: "1",
            teamName: "teamSUfurky",
            score:"109"
        },
        {
            position: "1",
            teamName: "teamSUfurky",
            score:"109"
        }
    ]
}