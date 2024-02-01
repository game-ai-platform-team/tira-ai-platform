import "./JustInTimeMoveList.css";
import Move from "./Move";
import { MoveProps } from "./Move";

interface JustInTimeMoveListProps {
    moves: MoveProps[];
    state: string;
}

function JustInTimeMoveList({ moves, state }: JustInTimeMoveListProps) {
    return (
        <div>
            <p>Received moves:</p>
            <ul id="move-list">
                {moves.map((move, index) => (
                    <li key={index}>
                        <Move move={move.move} time={move.time} />
                    </li>
                ))}
            </ul>
            <p>State: {state}</p>
        </div>
    );
}

export default JustInTimeMoveList;
