import React, { ChangeEvent, useState } from "react";
import "../scss/SubmitForm.scss";
import store from "../store.ts";
import { newGame } from "../reducers/gameReducer.ts";
import { GameConfig } from "../types.ts";

function SubmitForm(): JSX.Element {
    const [file, setFile] = useState<File | null>(null);
    const [elo, setElo] = useState<number>(1350);
    const [games, setGames] = useState<number>(1);

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

    const handleEloChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setElo(value);
    };

    const handleGamesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setGames(value);
    };

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (file && elo && !store.getState().game.isGameRunning) {
            const gameConfig: GameConfig = {
                elo: elo,
                file: await file.text(),
            };
            store.dispatch(newGame(gameConfig));
        }
    };

    return (
        <div id="drag-and-drop-container">
            <h2 id="submit-header">Upload your file</h2>

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
            <div id="config-slider">
                <label htmlFor="elo-slider">Select Stockfish Elo:</label>
                <input
                    id="elo-slider"
                    type="range"
                    min={1}
                    max={4000}
                    value={elo}
                    onChange={handleEloChange}
                />
                <p>Elo: {elo}</p>
            </div>
            <div id="config-slider">
                <label htmlFor="game-slider">Select How Many Games To Play:</label>
                <input
                    id="game-slider"
                    type="range"
                    min={1}
                    max={10}
                    value={games}
                    onChange={handleGamesChange}
                />
                <p>Games: {games}</p>
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
