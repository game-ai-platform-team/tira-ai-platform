import React, { useState } from "react";
import MoveStatistics from "../interfaces/MoveStatistics.ts";

interface CSVCreaterProps {
    moves: MoveStatistics[] | null;
}

const CSVCreater: React.FC<CSVCreaterProps> = ({ moves }) => {
    const [includeAdvantages, setIncludeAdvantages] = useState(true);
    const [includeTimes, setIncludeTimes] = useState(true);
    const [includeWhite, setIncludeWhite] = useState(true);
    const [includeBlack, setIncludeBlack] = useState(true);

    if (!moves) {
        return null;
    }

    const convertToCSV = () => {
        let csv = "Move,";
        if (includeAdvantages) {
            csv += "Advantage,";
        }
        if (includeTimes) {
            csv += "Time,";
        }
        csv += "\n";
        let index = 0;

        moves.forEach(() => {
            if (index % 2 == 1 && includeWhite) {
                csv += ConvertTurnToCSV(index);
            }
            if (index % 2 == 0 && includeBlack) {
                csv += ConvertTurnToCSV(index);
            }
            index++;
        });

        return csv;
    };

    const ConvertTurnToCSV = (i: number) => {
        let moveAsText = "";

        moveAsText += `${moves[i].move},`;

        if (includeAdvantages) {
            moveAsText += `${moves[i].evaluation || "0"},`;
        }
        if (includeTimes) {
            moveAsText += `${moves[i].time || "0"},`;
        }

        moveAsText += "\n";

        return moveAsText;
    };

    const downloadCSV = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const csvContent = convertToCSV();
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "statistics.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="CSVCreater-overlay">
            <div className="CSVCreater">
                <div className="CSVCreater-header">
                    <form onSubmit={downloadCSV}>
                        Elements in CSV
                        <br />
                        <input
                            type="checkbox"
                            checked={includeAdvantages}
                            onChange={() =>
                                setIncludeAdvantages(!includeAdvantages)
                            }
                        />
                        Advantages
                        <br />
                        <input
                            type="checkbox"
                            checked={includeTimes}
                            onChange={() => setIncludeTimes(!includeTimes)}
                        />
                        Times
                        <br />
                        <input
                            type="checkbox"
                            checked={includeWhite}
                            onChange={() => setIncludeWhite(!includeWhite)}
                        />
                        Player 1 moves
                        <br />
                        <input
                            type="checkbox"
                            checked={includeBlack}
                            onChange={() => setIncludeBlack(!includeBlack)}
                        />
                        Player 2 moves
                        <br />
                        <button id="download-csv" type={"submit"}>
                            Download CSV
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CSVCreater;
