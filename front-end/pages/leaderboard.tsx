import React, { useState, useEffect } from "react";
// import Description from "../components/LeaderBoard/Description";
import Head from "../components/LeaderBoard/Head";
import StraightLine from "../components/StraightLine";
import RankLine from "../components/LeaderBoard/RankLine";

interface Team {
  tname: string;
  points: number;
  time: number;
  ename: string;
  rank: number;
}

function sortTeamsByPointsDescending(teams: Team[]): Team[] {
  return teams.sort((a, b) => b.points - a.points);
}

interface LeaderBoardProps {
  leaderboardData: Team[];
}

export default function LeaderBoard({
  leaderboardData: defaultData,
}: LeaderBoardProps): JSX.Element {
	const [leaderboardData, setLeaderboardData] = useState<Team[]>([]);
	
	 const leaderboardUrl: string = process.env.NEXT_PUBLIC_LEADERBOARD_URL!;

  useEffect(() => {
    // Fetch leaderboard data from the API
    fetch(leaderboardUrl)
      .then((response) => response.json())
      .then((data) => {
        // Sort the data by points in descending order
        const sortedData = sortTeamsByPointsDescending(data);
        // Update the state with the received and sorted data
        setLeaderboardData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data:", error);
      });
  }, []);

  return (
    <div className="bg-bgBlack font-bruno h-auto">
      {/* head */}
      <Head />
      {/* head */}

      <StraightLine />

      {/* top-teamName-score */}
      {/* <Description /> */}
      {/* top-teamName-score */}

      {/* ranking */}
      <table className="text-color1 w-full">
        <thead>
          <tr className="text-2xl">
            <th className="p-1">Top 1-{leaderboardData.length}</th>
            <th className="p-1">Team Name</th>
            <th className="p-1">Points</th>
            <th className="p-1">Time</th>
            <th className="p-1">Event Name</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((team, index) => (
            <tr key={index} className="text-xl">
              <td className="p-1 pb-4 pl-24">{index + 1}</td>
              <td className="p-1 pb-4">{team.tname}</td>
              <td className="p-1 pb-4">{team.points}</td>
              <td className="p-1 pb-4">{team.time}</td>
              <td className="p-1 pb-4">{team.ename}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* ranking */}
    </div>
  );
}