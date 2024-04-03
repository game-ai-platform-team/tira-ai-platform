import React, { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import GameConfig from "../interfaces/GameConfig";
import { newGame } from "../reducers/gameReducer";
import resetStateReducer from "../reducers/resetReducer";
import "../scss/SubmitForm.scss";
import { startGame } from "../services/SocketService";
import { GameState } from "../types";
import { setToast } from "../reducers/toastReducer";
import Notification from "../components/Notification";

function SubmitForm(): JSX.Element {
    const dispatch = useAppDispatch();

    const game = useAppSelector((state) => state.game.config.game);
    const gameState = useAppSelector((state) => state.game.state);
    const isGameRunning = useAppSelector((state) => state.game.isGameRunning);

    const [elo, setElo] = useState<number>(1350);
    const [games, setGames] = useState<number>(1);

    const [githubUrl, setGithubUrl] = useState<string>("");
    const handleEloChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setElo(value);
    };

    const handleGamesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setGames(value);
    };

    const onSubmitGithub = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (githubUrl && elo && !isGameRunning) {
            const gameConfig: GameConfig = {
                elo,
                githubUrl,
                game,
            };

            dispatch(newGame(gameConfig));
            startGame(gameConfig);
            dispatch(setToast("Game submitted successfully!"));
        }
    };

    const onResetGame = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (isGameRunning && gameState !== GameState.CONTINUE) {
            dispatch(resetStateReducer());
        }
    };

    return (
        <div id="drag-and-drop-container">
            <h2 className="card-header">Upload your file</h2>

            <div id="config-slider">
                <label htmlFor="elo-slider">Select Stockfish Elo:</label>
                <input
                    id="elo-slider"
                    type="range"
                    min={1}
                    max={4000}
                    value={elo}
                    onChange={handleEloChange}
                    title="Difficulty"
                    aria-label="Difficulty"
                />
                <p>Elo: {elo}</p>
            </div>
            <div id="config-slider">
                <label htmlFor="game-slider">
                    Select How Many Games To Play:
                </label>
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
            <form id="github-submit-form" onSubmit={onSubmitGithub}>
                <input
                    title="Repository URL"
                    aria-label="Repository URL"
                    type="url"
                    value={githubUrl}
                    onChange={(event) => setGithubUrl(event.target.value)}
                />
                <button type="submit" id="submit-button" aria-label="Submit">
                    {" "}
                    Submit
                </button>

            </form>
            <button onClick={onResetGame}> Reset</button>

            <Notification/>
        </div>
    );
}

export default SubmitForm;
