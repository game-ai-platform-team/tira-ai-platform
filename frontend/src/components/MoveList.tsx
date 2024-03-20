import "../scss/MoveList.scss";
import Move from "./Move";
import store from "../store";
import { GameState } from "../types";

function MoveList({ handleCopyPGN }: { handleCopyPGN: () => void }) {
    const moves = store.getState().moves;
    const gameState = store.getState().game.state;
    let winner = "";

    if (gameState === GameState.WIN) {
        const moveCount = moves.length;
        if (moveCount && moveCount % 2 !== 0) {
            winner = "White";
        } else {
            winner = "Black";
        }
    }

    return (
        <div className="move-list">
            <a href="#" onClick={handleCopyPGN}>
                Copy PGN
            </a>
            <p>State: {gameState}</p>
            {gameState === GameState.WIN && <p>Winner: {winner}</p>}
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
