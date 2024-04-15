import ReactMarkdown from "react-markdown";
import manual from "../../../docs/user_manual/manual.md";
import chess from "../../../docs/user_manual/chess.md";
import connect_four from "../../../docs/user_manual/connect_four.md";

interface manualProps {
    game: string
}

const GeneralManual = (props: manualProps) => {
    const currentManual = props.game === "chess" ? (chess) : props.game === "cfour" ? (connect_four) : manual
    return (
        <div className="card">
            <ReactMarkdown>{currentManual}</ReactMarkdown>
        </div>
    );
};

export default GeneralManual;
