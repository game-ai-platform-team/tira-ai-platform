import ReactMarkdown from "react-markdown";
import connect_four from "../../../docs/user_manual/connect_four.md";

const CFourManual = () => {
    return (
        <div className="card">
            <ReactMarkdown>{connect_four}</ReactMarkdown>
        </div>
    );
};

export default CFourManual;
