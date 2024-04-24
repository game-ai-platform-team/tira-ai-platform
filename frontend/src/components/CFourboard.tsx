import { useAppSelector } from "../hook";
import { useState, useEffect, useCallback } from "react";
import store from "../store";
import { setBoardIndex } from "../reducers/boards/boardIndexReducer";
import "../scss/Gameboard.scss";
import { CFourUI } from "connect-four-board";
import { toNumber } from "lodash";
/**
 * Draws a standard Connect four game board and arrow buttons for navigating between game states
 * Board is drawn using an external library from
 * https://www.npmjs.com/package/connect-four-board
 * @see setBoardIndex - used from store.ts to change the currently visible game state
 *
 * @returns {JSX.Element} A React component depicting the Connect Four board.
 *  */
const CFourboard = (): JSX.Element => {
    const moves = useAppSelector((state) => state.moves);
    const boardIndex = useAppSelector((state) => state.boardIndex);
    const [currentMove, setCurrentMove] = useState(0);
    const handleMoveChange = useCallback(
        (newIndex: number) => {
            if (newIndex >= 0 && newIndex < moves.length + 1) {
                store.dispatch(setBoardIndex(newIndex));
                setCurrentMove(newIndex);
            }
        },
        [moves],
    );
    useEffect(() => {
        handleMoveChange(boardIndex);
    }, [boardIndex, handleMoveChange]);

    const root = document.documentElement
    const primary = root.style.getPropertyValue("--primary")
    const red = root.style.getPropertyValue("--red-marker")
    const yellow = root.style.getPropertyValue("--yellow-marker")

    return (
        <div id="gameboard" className="card">
            <h2 className="card-header">Connect Four</h2>
            <div>
                <CFourUI
                    rows={6}
                    columns={7}
                    moves={moves.map((movestat) => toNumber(movestat.move))}
                    move_index={boardIndex}
                    background_color={primary}
                    player_a_color={red}
                    player_b_color={yellow}
                />
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <span>Current Turn: {currentMove}</span>
                <br />
                <input
                    type="range"
                    min="0"
                    max={moves.length}
                    value={currentMove}
                    onChange={(event) =>
                        handleMoveChange(parseInt(event.target.value))
                    }
                    id="moveSlider"
                />
                <br />
                <button
                    onClick={() => handleMoveChange(currentMove - 1)}
                    id="previousMoveButton"
                >
                    {"<"}
                </button>
                <button
                    onClick={() => handleMoveChange(currentMove + 1)}
                    id="nextMoveButton"
                >
                    {">"}
                </button>
                <br />
            </div>
        </div>
    );
};

export default CFourboard;
