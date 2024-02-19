import { Chessboard as KokopuChessboard } from "kokopu-react";
import "../scss/Chessboard.scss";
import { useAppSelector } from "../hook";
import { useState, useEffect, useCallback } from "react";
import store from "../store";
import { setBoardIndex } from "../reducers/boardIndexReducer";

const Chessboard = () => {
    const [arrow, setArrow] = useState("G");
    const [arrowColor, setArrowColor] = useState("G");
    const [currentMove, setCurrentMove] = useState(0);
    const [selectedTheme, setSelectedTheme] = useState("original");
    const [selectedPieceset, setSelectedPieceset] = useState("cburnett");
    const boards = useAppSelector((state) => state.boards);
    const moves = useAppSelector((state) => state.moves);
    const boardIndex = useAppSelector((state) => state.boardIndex);

    const handleMoveChange = useCallback((newIndex: number) => {
        if (newIndex >= 0 && newIndex < moves.length + 1) {
            store.dispatch(setBoardIndex(newIndex));
            setCurrentMove(newIndex);
            if (newIndex > 0) {
                const newArrow = `${arrowColor}${moves[newIndex - 1].move.slice(0, 4)}`;
                setArrow(newArrow);
            } else {
                setArrow(`${arrowColor}`);
            }
        }
    }, [arrowColor, moves]);

    useEffect(() => {
        handleMoveChange(boardIndex);
    }, [boardIndex, handleMoveChange]);

    const handleArrowColorChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setArrowColor(event.target.value);
    };

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTheme(event.target.value);
    };

    const handlePiecesetChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedPieceset(event.target.value);
    };

    return (
        <div id="chessboard" className="card">
            <h2 className="card-header">Player1 vs Player2</h2>
            <KokopuChessboard
                position={boards[currentMove]}
                squareSize={60}
                arrowMarkers={arrow}
                colorset={selectedTheme}
                pieceset={selectedPieceset}
            />
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
                    id="previousChessboardButton"
                >
                    {"<"}
                </button>
                <button
                    onClick={() => handleMoveChange(currentMove + 1)}
                    id="nextChessboardButton"
                >
                    {">"}
                </button>
                <br />
                <select value={selectedTheme} onChange={handleThemeChange}>
                    {Object.keys(KokopuChessboard.colorsets()).map((theme) => (
                        <option key={theme} value={theme}>
                            {theme}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedPieceset}
                    onChange={handlePiecesetChange}
                >
                    {Object.keys(KokopuChessboard.piecesets()).map(
                        (pieceset) => (
                            <option key={pieceset} value={pieceset}>
                                {pieceset}
                            </option>
                        ),
                    )}
                </select>
                <select value={arrowColor} onChange={handleArrowColorChange}>
                    <option value="R">red</option>
                    <option value="G">green</option>
                    <option value="B">blue</option>
                    <option value="Y">yellow</option>
                </select>
            </div>
        </div>
    );
};

export default Chessboard;
