import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { ChessGameResult, parseChessGameResult } from "../types.ts";
import "./SubmitForm.css";

interface SubmitFormProps {
    setResult: (result: ChessGameResult) => void;
}

/**
 * Component for submitting code files to the server.
 *
 * @returns {JSX.Element}
 */
function SubmitForm(props: SubmitFormProps): JSX.Element {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (e.dataTransfer.items) {
            const droppedFile = e.dataTransfer.items[0].getAsFile();
            if (droppedFile) {
                setFile(droppedFile);
            }
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
        <div
            id="drag-and-drop-container"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div id="drag-and-drop-area">
                <label htmlFor="file-input">
                    Drag & Drop or Click to Upload:
                </label>
                <input
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
                    accept=".txt"
                />
                {file && <p>File Name: {file.name}</p>}
            </div>
            <form onSubmit={onSubmit}>
                <button id="submit-button" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SubmitForm;
