interface RankLineProps {
    position: string,
    teamName: string,
    score: string
}
const RankLine = ({ position, teamName, score }: RankLineProps): JSX.Element => {
    return (
        <div className='w-1/2  inline-flex gap-32 pl-48 my-3 '>
            <div className='flex text-3xl '>
                <h1>{position}</h1>
            </div>
            <div className='flex text-1xl border-l-2 border-b-2 border-color2 w-[15rem] pl-3 pt-2'>
                <p>{teamName}</p>
            </div>
            <div className='flex text-1xl border-r-2 border-b-2 border-color2 w-[5rem] pl-8 pt-2'>
                <p>{score}</p>
            </div>
        </div>
    );
}

export default RankLine;


