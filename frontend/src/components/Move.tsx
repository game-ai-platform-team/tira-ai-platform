import { useState } from "react";
import MoveStatistics from "../interfaces/MoveStatistics.ts";

interface MoveProps {
    statistics:MoveStatistics
}

const Move = ({ statistics }: MoveProps) => {
    const [visible, setVisible] = useState(false);
    const showWhenVisible = { display: visible ? "" : "none" };
    return (
        <div className="move">
            <a className="move-content" onClick={() => setVisible(!visible)}>
                <span>Move: {statistics.move}</span>
            </a>

            <div className="move-details" style={showWhenVisible}>
                <p />
                <span>Time: {statistics.time}</span>
                <p />
                <span>Logging: {statistics.logs} </span>
                <p />
            </div>
        </div>
    );
};

export default Move;
export type { MoveProps };
