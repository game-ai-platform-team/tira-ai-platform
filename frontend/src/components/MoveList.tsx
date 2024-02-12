import "../scss/MoveList.scss";
import Move from "./Move";
import store from "../store.ts";

function MoveList() {
    const moves = store.getState().moves;
    return (
        <div className="move-list">
            <p>State: {store.getState().game.state}</p>
            <p>Received moves:</p>
            <div
                id="move-container"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                }}
            >
                {moves.map((move) => (
                    <Move
                        move={move.move}
                        logs={move.logs}
                        time={move.time}
                        evaluation={move.evaluation}
                    />
                ))}
            </div>
        </div>
    );
}

export default MoveList;
