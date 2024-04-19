import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import GameConfig from "../interfaces/GameConfig";
import { newGame } from "../reducers/gameReducer";
import resetStateReducer from "../reducers/resetReducer";
import "../scss/SubmitForm.scss";
import { startGame } from "../services/SocketService";
import { GameState } from "../types";
import { setToast } from "../reducers/toastReducer";
import Notification from "../components/Notification";
import { useLocation } from "react-router-dom";

/**
 * Renders a form for submitting game configurations including Elo rating or difficulty level,
 * number of games to play, and repository URL for AI code. Provides options for starting a new game,
 * resetting the current game state, and displays notifications for game outcomes and actions.
 *
 * @returns {JSX.Element} JSX element containing the rendered submit form.
 */
function SubmitForm(): JSX.Element {
    const dispatch = useAppDispatch();
    const path = useLocation();
    const game = path.pathname.split("/").pop();
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
        const currentGame = !game ? "chess" : game;
        if (githubUrl && elo && !isGameRunning) {
            const gameConfig: GameConfig = {
                elo,
                githubUrl,
                game: currentGame,
            };

            dispatch(newGame(gameConfig));
            startGame(gameConfig);
            dispatch(
                setToast({
                    text: "Game submitted successfully!",
                    color: "Success",
                }),
            );
        } else {
            dispatch(setToast({ text: "Failed", color: "Danger" }));
        }
    };

    const onResetGame = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (isGameRunning && gameState !== GameState.CONTINUE) {
            dispatch(resetStateReducer());
            dispatch(
                setToast({
                    text: "Game successfully reset!",
                    color: "Success",
                }),
            );
        }
    };

    useEffect(() => {
        gameState === GameState.WIN ||
            (GameState.DRAW &&
                dispatch(
                    setToast({
                        text: "Game ended successfully!",
                        color: "Success",
                    }),
                ));
        gameState === GameState.INVALID &&
            dispatch(
                setToast({
                    text: "Game ended, an invalid move was made",
                    color: "Danger",
                }),
            );
        gameState === GameState.ILLEGAL &&
            dispatch(
                setToast({
                    text: "Game ended, an illegal move was made",
                    color: "Danger",
                }),
            );
        gameState === GameState.TIMEOUT &&
            dispatch(
                setToast({
                    text: "TIMEOUT!!! Your ai is too slow",
                    color: "Danger",
                }),
            );
    }, [dispatch, gameState]);

    return (
        <div id="drag-and-drop-container">
            <h2 className="card-header">Upload your file</h2>

            <div id="config-slider">
                {game === "chess" ? (
                    <label htmlFor="elo-slider">Select Stockfish elo:</label>
                ) : (
                    <label htmlFor="elo-slider">Select Difficulty:</label>
                )}
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
                {game === "chess" ? (
                    <p>Elo: {elo}</p>
                ) : (
                    <p>Difficulty: {elo}</p>
                )}
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
            <Notification />
        </div>
    );
}

export default SubmitForm;
