import "./MoveList.css";
import Move from "./Move";
import { MoveProps } from "./Move";

interface MoveListProps {
    moves: MoveProps[];
    state: string;
}

function MoveList({ moves, state }: MoveListProps) {
    return (
        <div>
            <p>Received moves:</p>
            <ul id="move-list">
                {moves.map((move, index) => (
                    <li key={index}>
                        <Move
                            move={move.move}
                            time={move.time}
                            advantage={move.advantage}
                        />
                    </li>
                ))}
            </ul>
            <p>State: {state}</p>
        </div>
    );
}

export default MoveList;
