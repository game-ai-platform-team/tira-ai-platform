import "../scss/MoveList.scss";
import Move from "./Move";
import store from "../store.ts";

interface MoveListProps {
}

function MoveList(_: MoveListProps) {
    const moves = store.getState().moves;
    return (
        <div className="move-list">
            <p>State: {store.getState().game.state}</p>
            <p>Received moves:</p>
            <ul>
                {moves.map((move, index) => (
                    <li key={index}>
                        <Move statistics={move}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MoveList;
