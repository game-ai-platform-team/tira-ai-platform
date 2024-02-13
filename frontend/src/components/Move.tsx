import { useState } from "react";
import MoveStatistics from "../interfaces/MoveStatistics.ts";

const Move = ({
    move,
    logs,
    time,
    index,
}: MoveStatistics & { index: number }) => {
    const [visible, setVisible] = useState(false);
    const showWhenVisible = { display: visible ? "" : "none" };
    const dropdownImage = visible
        ? "dropdown_mark_open.svg"
        : "dropdown_mark.svg";

    return (
        <div className="move">
            <a className="move-content" onClick={() => setVisible(!visible)}>
                <img src={dropdownImage} />
                <span>
                    {index + 1}: {move}
                </span>
            </a>

            <div className="move-details" style={showWhenVisible}>
                <p />
                <span>Time: {time}</span>
                {logs && logs !== "" && (
                    <>
                        <p />
                        <span>Logs: {logs}</span>
                        <p />
                    </>
                )}
            </div>
        </div>
    );
};

export default Move;
