import { useState } from "react";

interface MoveProps {
    move: string;
    time: number;
    advantage: number;
    logs: string;
}

const Move = ({ move, time, logs }: MoveProps) => {
    const [visible, setVisible] = useState(false);
    const showWhenVisible = { display: visible ? "" : "none" };
    return (
        <div className="move">
            <a className="move-content" onClick={() => setVisible(!visible)}>
                <span>Move: {move}</span>
            </a>

            <div className="move-details" style={showWhenVisible}>
                <p />
                <span>Time: {time}</span>
                <p />
                <span>Logging: {logs} </span>
                <p />
            </div>
        </div>
    );
};

export default Move;
export type { MoveProps };
