import { Chessboard as KokopuChessboard } from "kokopu-react";
import "../scss/Chessboard.scss";
import { useAppSelector } from "../hook";
import { useState, useEffect } from "react";

const Chessboard = () => {
    const [arrow, setArrow] = useState("G");
    const [currentMove, setCurrentMove] = useState(0);
    const [selectedTheme, setSelectedTheme] = useState("original");
    const [selectedPieceset, setSelectedPieceset] = useState("cburnett");
    const boards = useAppSelector((state) => state.boards);
    const moves = useAppSelector((state) => state.moves);
    const boardIndex = useAppSelector((state) => state.boardIndex);

    useEffect(() => {
        if (boardIndex >= 1 && moves.length > 0) {
            const newArrow = `G${moves[boardIndex - 1].move.slice(0, 4)}`;
            setArrow(newArrow);
            setCurrentMove(boardIndex);
        }
    }, [boardIndex, moves]);

    const handleMoveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newIndex = parseInt(event.target.value);
        setCurrentMove(newIndex);
        const newArrow = `G${moves[newIndex - 1].move.slice(0, 4)}`;
        setArrow(newArrow);
    };

    const decreaseMove = () => {
        if (currentMove > 0) {
            setCurrentMove(currentMove - 1);
            const newArrow = `G${moves[currentMove - 1].move.slice(0, 4)}`;
            setArrow(newArrow);
        }
    };

    const increaseMove = () => {
        if (currentMove < moves.length) {
            setCurrentMove(currentMove + 1);
            const newArrow = `G${moves[currentMove + 1].move.slice(0, 4)}`;
            setArrow(newArrow);
        }
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
            <h2 id="chessboard-header">Player1 vs Player2</h2>
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
                    onChange={handleMoveChange}
                    id="moveSlider"
                />
                <br />
                <button onClick={decreaseMove} id="previousChessboardButton">
                    {"<"}
                </button>
                <button onClick={increaseMove} id="nextChessboardButton">
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
            </div>
        </div>
    );
};

export default Chessboard;
