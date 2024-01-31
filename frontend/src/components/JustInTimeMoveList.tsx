import "./JustInTimeMoveList.css";

interface MoveStatistics {
    move: string;
    time: number;
    advantage: number;
  }
  
interface JustInTimeMoveListProps {
    moveStatistics: MoveStatistics[];
    state: string;
}

function JustInTimeMoveList(props: JustInTimeMoveListProps) {
    return (
        <div>
            <p>Received moves:</p>
            <ul id="move-list">
                {props.moveStatistics.map((move, index) => (
                    <li key={index}>{move.move} Time: {move.time} Advantage: {move.advantage}</li>
                ))}
            </ul>
            <p>
                State: {props.state}
            </p>
        </div>
    );
}

export default JustInTimeMoveList;
