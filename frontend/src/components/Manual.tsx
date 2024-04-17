import ReactMarkdown from "react-markdown";
import manual from "../../../docs/user_manual/manual.md";
import chess from "../../../docs/user_manual/chess.md";
import connect_four from "../../../docs/user_manual/connect_four.md";

interface manualProps {
    game: string;
}
/**
 * Draws a markdown file containing a manual.
 * Uses ReactMarkdown to render .md files
 * The manual shown depends on the relevant game
 *
 * @param String matching the desired manual. 
 * Unless parameter is "chess" or "connect_four" resorts to the general manual  
 * 
 * @returns A manual matching the relevant game or a general manual if no game is relevant
 */
const GeneralManual = (props: manualProps) => {
    const currentManual =
        props.game === "chess"
            ? chess
            : props.game === "connect_four"
              ? connect_four
              : manual;
    return (
        <div className="card container">
            <ReactMarkdown>{currentManual}</ReactMarkdown>
        </div>
    );
};

export default GeneralManual;
