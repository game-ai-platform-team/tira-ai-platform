import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import GameConfig from "../interfaces/GameConfig";
import { newGame } from "../reducers/gameReducer";
import resetStateReducer from "../reducers/resetReducer";
import "../scss/SubmitForm.scss";
import { startGame } from "../services/SocketService";
import { GameState } from "../types";
import { setToast } from "../reducers/toastReducer";
import { useLocation } from "react-router-dom";
import { getCookie, setCookie } from "../services/CookieService";

/**
 * Renders a form for submitting game configurations including Elo rating or difficulty level
 * and repository URL for AI code. Provides options for starting a new game and a button for
 * resetting the current game state.
 *
 * @returns {JSX.Element} JSX element containing the rendered submit form.
 */
function SubmitForm(): JSX.Element {
    const dispatch = useAppDispatch();
    const path = useLocation();
    const game = path.pathname.split("/").pop();
    const gameState = useAppSelector((state) => state.game.state);
    const isGameRunning = useAppSelector((state) => state.game.isGameRunning);
    const areThereMoves = useAppSelector((state) => state.moves.length > 0);

    const [elo, setElo] = useState<number>(1350);

    const [githubUrl, setGithubUrl] = useState<string>(
        getCookie("github_url") || "",
    );
    const handleEloChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setElo(value);
    };

    const onSubmitGithub = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const currentGame = !game ? "chess" : game;
        if (githubUrl && elo && !isGameRunning) {
            if (validateGitHubURL(githubUrl)) {
                setCookie("github_url", githubUrl);
                const gameConfig: GameConfig = {
                    elo,
                    githubUrl,
                    game: currentGame,
                };

                dispatch(newGame(gameConfig));
                startGame(gameConfig);
                dispatch(
                    setToast({
                        title: "Game submitted successfully!",
                        text: `Starting a ${game} game with AI from ${githubUrl}...`,
                        color: "Success",
                    }),
                );
            } else {
                dispatch(
                    setToast({
                        title: "URL was not valid!",
                        text: "Only links to GitHub repositories are supported.",
                        color: "Danger",
                    }),
                );
            }
        } else if (!githubUrl) {
            dispatch(
                setToast({
                    title: "No link!",
                    text: "No link was entered. Please enter the link to your GitHub project in the input field.",
                    color: "Danger",
                }),
            );
        } else if (isGameRunning) {
            dispatch(
                setToast({
                    title: "Game in progeress!",
                    text: "A game is alredy being played, please wait until it is finished before submitting!",
                    color: "danger",
                }),
            );
        } else {
            dispatch(
                setToast({
                    title: "Game submission failed!",
                    text: "Make sure your project follows the correct project structure, as described in the manual.",
                    color: "Danger",
                }),
            );
        }
    };

    const onResetGame = (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        if (!isGameRunning && gameState !== GameState.CONTINUE) {
            setElo(1350);
            dispatch(resetStateReducer());
            dispatch(
                setToast({
                    title: "Game reset",
                    text: "Game successfully reset!",
                    color: "Success",
                }),
            );
        }
    };

    function validateGitHubURL(url: string) {
        const githubRepoRegex =
            /^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)(?:\/)?$/;
        return githubRepoRegex.test(url);
    }

    useEffect(() => {
        if (gameState === GameState.WIN || gameState === GameState.DRAW) {
            dispatch(
                setToast({
                    title: "Game ended successfully!",
                    text: `There was a ${gameState}`,
                    color: "Success",
                }),
            );
        }
        if (gameState === GameState.INVALID) {
            dispatch(
                setToast({
                    title: "Game ended unsuccessfully!",
                    text: "An invalid move was made",
                    color: "Danger",
                }),
            );
        }
        if (gameState === GameState.ILLEGAL) {
            dispatch(
                setToast({
                    title: "Game ended unsuccessfully!",
                    text: "An illegal move was made",
                    color: "Danger",
                }),
            );
        }
        if (gameState === GameState.TIMEOUT) {
            dispatch(
                setToast({
                    title: "Game ended unsuccessfully!",
                    text: "TIMEOUT!!! Your ai is too slow",
                    color: "Danger",
                }),
            );
        }
    }, [dispatch, gameState]);

    return (
        <div id="drag-and-drop-container" className="card">
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
            <form id="github-submit-form" onSubmit={onSubmitGithub}>
                <input
                    title="Repository URL"
                    aria-label="Repository URL"
                    type="url"
                    value={githubUrl}
                    onChange={(event) => setGithubUrl(event.target.value)}
                />
                <button type="submit" id="submit-button" aria-label="Submit" disabled={isGameRunning}>
                    {" "}
                    {!areThereMoves && isGameRunning ? (
                        <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                    ) : (
                        "Submit "
                    )}
                </button>
            </form>
            <button onClick={onResetGame} id="reset-button" disabled={!(!isGameRunning && gameState !== GameState.CONTINUE)}>
                {" "}
                Reset
            </button>
        </div>
    );
}

export default SubmitForm;
