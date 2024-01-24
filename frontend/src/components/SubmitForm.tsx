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
        if (
            file &&
            props.gameConnection &&
            props.gameConnection.isConnected()
            && !props.hasGameStarted
        ) {
            props.gameConnection.postcode(await file.text());
            props.setHasGameStarted(true);
        }
    };

    return (
        <div
            id="drag-and-drop-container"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div
                id="drag-and-drop-area"
                onClick={() => document.getElementById("file-input")?.click()}
            >
                <label htmlFor="file-input">
                    Drag & Drop or Click to Upload:
                </label>
                <input
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
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
