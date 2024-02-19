import "../scss/MoveList.scss";
import Move from "./Move";
import store from "../store";

function MoveList({ handleCopyPGN }: { handleCopyPGN: () => void }) {
    const moves = store.getState().moves;

    return (
        <div className="move-list">
            <a href="#" onClick={handleCopyPGN}>
                Copy PGN
            </a>
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
                <ul style={{ minWidth: "200px", minHeight: "400px" }}>
                    {moves.map((move, index) => (
                        <Move
                            key={index}
                            index={index}
                            move={move.move}
                            logs={move.logs}
                            time={move.time}
                            evaluation={move.evaluation}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MoveList;
