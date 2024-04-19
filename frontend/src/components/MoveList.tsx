import "../scss/MoveList.scss";
import Move from "./Move";
import store from "../store";
import { GameState } from "../types";
import { useLocation } from "react-router-dom";

/**
 * Typescript object for showing the moves of the current game.
 *
 * @returns {JSX.Element} React object containing the following:
 * A button for copying current list of moves.
 * Current gamestate
 * List of all moves as clickable "Move"-objects
 */
function MoveList({
    handleCopyPGN,
}: {
    handleCopyPGN: () => void;
}): JSX.Element {
    const moves = store.getState().moves;
    const gameState = store.getState().game.state;
    const path = useLocation();
    const game = path.pathname.split("/").pop();
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
            {game === "chess" && (
                <a href="#" onClick={handleCopyPGN}>
                    Copy PGN
                </a>
            )}
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
