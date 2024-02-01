import { useState } from "react";

interface MoveProps {
    move: string;
    time: number;
}

const Move = ({ move, time }: MoveProps) => {
    const [visible, setVisible] = useState(false)
    const showWhenVisible = { display: visible ? "" : "none"}
        return (
        <div className="move">
            <a onClick={() => setVisible(!visible)}>
                <span>Move: {move}</span>
            </a>

            <div style={showWhenVisible}>
                <span>Time: {time}</span>
            </div>
        </div>
    );
};

export default Move;
export type { MoveProps };
