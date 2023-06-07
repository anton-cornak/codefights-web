import React from 'react';
import Leaderboard from '../components/LeaderboardComponent';

const fakeData = [
  {
    tname: 'VismaFighters',
    points: 25,
    time: 4515,
    ename: 'Olympiáda Marek',
  },
  {
    tname: 'MarekoVci',
    points: 30,
    time: 4515,
    ename: 'Olympiáda Marek',
  },
  {
    tname: 'RukyMatLop',
    points: 35,
    time: 4515,
    ename: 'Olympiáda Marek',
  },
  {
    tname: 'TomasSekera',
    points: 40,
    time: 4515,
    ename: 'Olympiáda Marek',
  },
  {
    tname: 'Michalovce',
    points: 0,
    time: 45155,
    ename: 'Olympiáda Marek',
  },
  {
    tname: 'Poproc',
    points: 1500,
    time: 45,
    ename: 'Olympiáda Marek',
  },
];

const LeaderboardPage: React.FC = () => {
  return <Leaderboard data={fakeData} />;
};

export async function getStaticProps() {
  // You can perform any necessary data fetching or computations here

  return {
    props: {
      fakeData, // Pass the fake data as a prop
    },
  };
}

export default LeaderboardPage;
