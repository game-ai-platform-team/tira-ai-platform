import "./MoveList.scss";
import Move, { MoveProps } from "./Move";

interface MoveListProps {
    moves: MoveProps[];
    state: string;
}

function MoveList({ moves, state }: MoveListProps) {
    return (
        <div className="move-list">
            <p>State: {state}</p>
            <p>Received moves:</p>
            <ul>
                {moves.map((move, index) => (
                    <li key={index}>
                        <Move
                            move={move.move}
                            time={move.time}
                            advantage={move.advantage}
                            logs={move.logs}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MoveList;
