import React, {ChangeEvent, JSX, useState} from "react";
import axios from "axios";
import {ChessGameResult, parseChessGameResult} from "../types.ts";

interface SubmitFormProps {
    setResult: (result: ChessGameResult) => void;
}

/**
 *  Component for submitting code files to server.
 *
 * @returns {JSX.Element}
 */
function SubmitForm(props: SubmitFormProps): JSX.Element {
    const [file, setFile] = useState<File>();

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const baseURL = "http://localhost:5000";
        if (file) {
            const result = await axios.post(`${baseURL}/api/chess/submit`, {
                content: await file.text(),
            });

            const gameResult = parseChessGameResult(result.data);
            if (gameResult) {
                props.setResult(gameResult);
            }

        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input id="file-input" type="file" onChange={handleFile}/>
                <button id="submit-button" type="submit">
                    Submit
                </button>
            </form>
        </>
    );
}

export default SubmitForm;
