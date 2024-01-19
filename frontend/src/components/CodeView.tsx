import SubmitForm from "./SubmitForm.tsx";
import {useState} from "react";

function CodeView() {
    const [result, setResult] = useState<{ moves: string[], winner: string }>()

    const moves = result?.moves ? result.moves : []
    const winnerMessage = result?.winner ? <p>winner: {result.winner}</p> : undefined


    return (
        <>
            <SubmitForm setResult={setResult}></SubmitForm>
            {winnerMessage}
            <ol>
                {moves.map((value,index) => <li key={index}>{value}</li>)}
            </ol>
        </>
    );
}

export default CodeView;
