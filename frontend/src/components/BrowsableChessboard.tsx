import { Position } from "kokopu";
import { Chessboard } from "kokopu-react";
import { useEffect, useState } from "react";
import "./BrowsableChessboard.css";
import EvaluationBar from "./EvaluationBar";

interface BrowsableChessboardProps {
    moves?: string[];
}

const emptyList: string[] = [];

export function BrowsableChessboard(props: BrowsableChessboardProps) {
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
    }, [moves]);

    useEffect(() => {
        setMoveNumber(moves.length - 1);
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
                <Chessboard position={positions[moveNumber]}></Chessboard>
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
            <div style={{ marginLeft: "100px" }}>
                <EvaluationBar linePosition={0.5} />
            </div>
        </div>
    );
}
