import SubmitForm from "./SubmitForm.tsx";
import { useState } from "react";
import { ChessGameResult } from "../types.ts";

interface CodeViewProps {
    testResult?: ChessGameResult;
}

function CodeView(props: CodeViewProps) {
    const [result, setResult] = useState(props?.testResult);

    const moves = result?.moves ? result.moves : [];
    const winnerMessage = result?.winner ? (
        <p>winner: {result.winner}</p>
    ) : undefined;

    return (
        <>
            <SubmitForm setResult={setResult}></SubmitForm>
            {winnerMessage}
            <ol id="move-list">
                {moves.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ol>
        </>
    );
}

export default CodeView;
