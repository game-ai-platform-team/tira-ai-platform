import { Position } from "kokopu";
import { Chessboard as KokopuChessboard } from "kokopu-react";
import { useEffect, useState } from "react";
import "./Chessboard.css";

interface ChessboardProps {
    moves?: string[];
}

const emptyList: string[] = [];

const Chessboard = (props: ChessboardProps) => {
    new Position();
    const moves = props.moves ? props.moves : emptyList;
    const [moveNumber, setMoveNumber] = useState<number>(0);
    const [positions, setPositions] = useState<Position[]>([]);

    useEffect(() => {
        let oldPosition = new Position();
        const set: Position[] = [oldPosition];
        for (let i = 0; i < moves.length; i++) {
            const value = moves[i];
            const newPos = new Position(oldPosition);
            newPos.play(newPos.uci(value));
            set.push(newPos);
            oldPosition = newPos;
        }
        setPositions(set);
        setMoveNumber(moves.length);
    }, [moves]);

    const increaseMoveNumber = () => {
        setMoveNumber((prevState) => {
            const next = prevState + 1;
            return next <= moves.length ? next : prevState;
        });
    };
    const decreaseMoveNumber = () => {
        setMoveNumber((prevState) => {
            const next = prevState - 1;
            return next >= 0 ? next : prevState;
        });
    };

    let arrow: string = "G";
    if (moveNumber > 0) {
        arrow = arrow + moves[moveNumber - 1].slice(0, 4);
    }

    return (
        <div id="chessboard">
            <h2 id="chessboard-header">Player1 vs Player2</h2>
            <KokopuChessboard
                position={positions[moveNumber]}
                squareSize={60}
                arrowMarkers={arrow}
            />
            <div>
                <button
                    onClick={decreaseMoveNumber}
                    id="previousChessboardButton"
                >
                    {"<"}
                </button>
                <button onClick={increaseMoveNumber} id="nextChessboardButton">
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default Chessboard;
