import ReactMarkdown from "react-markdown";
import chess from "../../../docs/user_manual/chess.md";

const ChessManual = () => {
    return (
        <div className="card">
            <ReactMarkdown>{chess}</ReactMarkdown>
        </div>
    );
};

export default ChessManual;
