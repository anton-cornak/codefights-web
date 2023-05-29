interface ScorePointsProps {
    score: String
}
const ScorePoints = ({ score }: ScorePointsProps): JSX.Element => {
    return (
        <h1>{score}</h1>
    );

} 
export default ScorePoints;