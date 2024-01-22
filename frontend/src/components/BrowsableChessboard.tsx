import { Position } from "kokopu";
import { Chessboard } from "kokopu-react";
import { useState } from "react";

interface BrowsableChessboardProps {
    moves?: string[];
}

export function BrowsableChessboard(props: BrowsableChessboardProps) {
    const position = new Position();
    const moves = props.moves ? props.moves : [];
    const [moveNumber, setMoveNumber] = useState<number>(0);

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

    for (let i = 0; i < moves.length && i < moveNumber; i++) {
        const value = moves[i];
        position.play(position.uci(value));
    }

    return (
        <div style={{ width: "min-content" }}>
            <Chessboard position={position}></Chessboard>
            <div
                style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    display: "flex",
                }}
            >
                <button onClick={decreaseMoveNumber}>{"<"}</button>
                <button onClick={increaseMoveNumber}>{">"}</button>
            </div>
        </div>
    );
}
