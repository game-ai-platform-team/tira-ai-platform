import { Position } from "kokopu";
import { Chessboard as KokopuChessboard } from "kokopu-react";
import { useEffect, useState } from "react";
import "./Chessboard.css";
import AdvantageBar from "./AdvantageBar";

interface ChessboardProps {
    moves?: string[];
    advantage?: number;
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

    return (
        <div
            id="ChessboardContainer"
            style={{ display: "flex", flexDirection: "row" }}
        >
            <div id="BrowsableChessboard">
                <div id="chessboard-header">Player1 vs Player2</div>
                <KokopuChessboard position={positions[moveNumber]} />
                <div>
                    <button
                        onClick={decreaseMoveNumber}
                        id="previousChessboardButton"
                    >
                        {"<"}
                    </button>
                    <button
                        onClick={increaseMoveNumber}
                        id="nextChessboardButton"
                    >
                        {">"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chessboard;
