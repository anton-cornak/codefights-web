interface ScorePointsProps {
    score: String
}
const ScorePoints = ({ score }: ScorePointsProps): JSX.Element => {
    return (
        <h1 className="text-color2">{score}</h1>
    );

} 
export default ScorePoints;