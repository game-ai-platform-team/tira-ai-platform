import SubmitForm from "./SubmitForm.tsx";
import { useState, useCallback } from "react";
import { ChessGameResult } from "../types.ts";
import { BrowsableChessboard } from "./BrowsableChessboard.tsx";
import JustInTimeMoveList from "./JustInTimeMoveList.tsx";

interface CodeViewProps {
    testResult?: ChessGameResult;
}

function CodeView(props: CodeViewProps) {
    const [result, setResult] = useState(props?.testResult);

    const [moves, setMoves] = useState<string[]>([]);
    const handleNewMove = useCallback((newMove: string) => {
        setMoves((prevMoves) => [...prevMoves, newMove]);
    }, []);

    const winnerMessage = result?.winner ? (
        <p>winner: {result.winner}</p>
    ) : undefined;

    return (
        <>
            <SubmitForm setResult={setResult}></SubmitForm>
            {winnerMessage}
            <BrowsableChessboard moves={moves} />
            <JustInTimeMoveList moves={moves} onNewMove={handleNewMove} />
        </>
    );
}

export default CodeView;
