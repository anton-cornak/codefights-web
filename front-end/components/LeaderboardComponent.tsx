import React from 'react';

type TeamData = {
  tname: string;
  points: number;
  time: number;
  ename: string;
};

type LeaderboardProps = {
  data: TeamData[];
};

const LeaderboardComponent: React.FC<LeaderboardProps> = ({ data }) => {
  return (
    <div>
      <h1>Leaderboard top 20</h1>
      <table>
        <thead>
          <tr>
            <th>Top</th>
            <th>Team Name</th>
            <th>Score</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((team, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{team.tname}</td>
              <td>{team.points}</td>
              <td>{team.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardComponent;
