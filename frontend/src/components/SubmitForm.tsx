import React, { ChangeEvent, useState } from "react";
import "../scss/SubmitForm.scss";
import store from "../store";
import { newGame, resetGame } from "../reducers/gameReducer";
import GameConfig from "../interfaces/GameConfig";
import { resetBoardIndex } from "../reducers/boardIndexReducer";
import { resetBoards } from "../reducers/boardReducer";
import { resetMoves } from "../reducers/moveReducer";
import { GameState } from "../types";
import { resetAlLLog } from "../reducers/allLogReducer";
import { useAppSelector } from "../hook";

function SubmitForm(): JSX.Element {
    const game = useAppSelector((state) => state.game.config.game);

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
        if (githubUrl && elo && !store.getState().game.isGameRunning) {
            const gameConfig: GameConfig = {
                elo,
                githubUrl,
                game,
            };
            store.dispatch(newGame(gameConfig));
        }
    };

    const onResetGame = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (
            store.getState().game.isGameRunning &&
            store.getState().game.state !== GameState.CONTINUE
        ) {
            store.dispatch(resetGame());
            store.dispatch(resetBoardIndex());
            store.dispatch(resetBoards());
            store.dispatch(resetMoves());
            store.dispatch(resetAlLLog());
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
                    id="url-field"
                    type="url"
                    value={githubUrl}
                    onChange={(event) => setGithubUrl(event.target.value)}
                />
                <button type="submit" id="submit-button">
                    {" "}
                    Submit
                </button>
            </form>
            <button id="submit-button" onClick={onResetGame}>
                {" "}
                Reset
            </button>
        </div>
    );
}

export default SubmitForm;
