import React, { ChangeEvent, useState } from "react";
import "./SubmitForm.css";
import { GameConnection } from "../services/GameConnection.ts";

interface SubmitFormProps {
    gameConnection?: GameConnection;
    hasGameStarted: boolean;
    setHasGameStarted: (val: boolean) => void;
}

function SubmitForm(props: SubmitFormProps): JSX.Element {
    const [file, setFile] = useState<File | null>(null);
    const [difficulty, setDifficulty] = useState<number>(1);

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

    const handleDifficultyChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setDifficulty(value);
    };

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (
            file &&
            difficulty &&
            props.gameConnection &&
            props.gameConnection.isConnected() &&
            !props.hasGameStarted
        ) {
            props.gameConnection.postcode(await file.text(), difficulty);
            props.setHasGameStarted(true);
        }
    };

    return (
        <div id="drag-and-drop-container">
            <div id="submit-header">Upload your file</div>
            <div
                id="drag-and-drop-area"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-input")?.click()}
            >
                <label htmlFor="file-input">
                    Drag & Drop or Click to Upload:
                </label>
                <input
                    id="file-input"
                    type="file"
                    accept=".py, application/x-python-code"
                    onChange={handleFileChange}
                />
                {file && <p>File Name: {file.name}</p>}
            </div>
            <div id="difficulty-config">
                <label htmlFor="difficulty-slider">
                    Select Stockfish Difficulty:
                </label>
                <input
                    id="difficulty-slider"
                    type="range"
                    min={0}
                    max={20}
                    value={difficulty}
                    onChange={handleDifficultyChange}
                />
                <p>Difficulty: {difficulty}</p>
            </div>
            <form id="submit-form" onSubmit={onSubmit}>
                <button id="submit-button" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SubmitForm;
