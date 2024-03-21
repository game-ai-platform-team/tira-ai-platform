import { useAppSelector } from "../hook";
import { useState, useEffect, useCallback } from "react";
import store from "../store";
import { setBoardIndex } from "../reducers/boardIndexReducer";
import "../scss/Gameboard.scss";
import ConnectFourBoard from "./ConnectFourBoard";

const CFourboard = () => {
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

    return (
        <div id="gameboard" className="card">
            <h2 className="card-header">Connect Four</h2>
            <div>
                <ConnectFourBoard row={6} column={7} moves={moves} />
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
