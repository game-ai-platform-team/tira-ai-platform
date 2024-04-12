import ReactMarkdown from "react-markdown";
import manual from "../../../docs/user_manual/manual.md";

const GeneralManual = () => {
    return (
        <div className="card">
            <ReactMarkdown>{manual}</ReactMarkdown>
        </div>
    );
};

export default GeneralManual;
