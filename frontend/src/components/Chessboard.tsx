import { Chessboard as KokopuChessboard } from "kokopu-react";
import "../scss/Gameboard.scss";
import { useAppSelector } from "../hook";
import { useState, useEffect, useCallback } from "react";
import store from "../store";
import { setBoardIndex } from "../reducers/boards/boardIndexReducer";

/**
 * Draws a standard chess game board and arrow buttons for navigating between game states
 * Board is drawn using an external library from kokopu-react
 * @see setBoardIndex - used from store.ts to change the currently visible game state
 * There are also various methods for modifying the visual style of the game.
 *
 * @returns {JSX.Element} A react object depicting a chess board.
 */
const Chessboard = (): JSX.Element => {
    const [arrow, setArrow] = useState("G");
    const [arrowColor, setArrowColor] = useState("G");
    const [currentMove, setCurrentMove] = useState(0);
    const [selectedTheme, setSelectedTheme] = useState("original");
    const [selectedPieceset, setSelectedPieceset] = useState("cburnett");
    const boards = useAppSelector((state) => state.boards.chessBoards);
    const moves = useAppSelector((state) => state.moves);
    const boardIndex = useAppSelector((state) => state.boardIndex);

    const handleMoveChange = useCallback(
        (newIndex: number) => {
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
        },
        [arrowColor, moves],
    );

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

    const colorsets = KokopuChessboard.colorsets();
    const piecesets = KokopuChessboard.piecesets();

    const root = document.documentElement;
	root.style.setProperty("--primary", colorsets[selectedTheme].b);
	root.style.setProperty("--secondary", colorsets[selectedTheme].w);
	root.style.setProperty("--blue_marker", colorsets[selectedTheme].cb);
	root.style.setProperty("--green_marker", colorsets[selectedTheme].cg);
	root.style.setProperty("--red_marker", colorsets[selectedTheme].cr);
	root.style.setProperty("--yellow_marker", colorsets[selectedTheme].cy);

    return (
        <div id="gameboard" className="card">
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
                    {Object.keys(colorsets).map((theme) => (
                        <option key={theme} value={theme}>
                            {theme}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedPieceset}
                    onChange={handlePiecesetChange}
                >
                    {Object.keys(piecesets).map(
                        (pieceset) => (
                            <option key={pieceset} value={pieceset}>
                                {pieceset}
                            </option>
                        ),
                    )}
                </select>
                <select value={arrowColor} onChange={handleArrowColorChange}>
                    <option value="">no arrow</option>
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
