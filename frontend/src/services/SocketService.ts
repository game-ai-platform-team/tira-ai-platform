/**
 * Handles WebSocket communication with the backend server.
 *
 * This module facilitates communication with the backend server using WebSocket (socket.io).
 * It provides functions for starting a game, receiving and dispatching moves and game states,
 * and handling errors and final game states.
 */

import { io } from "socket.io-client";
import GameConfig from "../interfaces/GameConfig.ts";
import MoveStatistics from "../interfaces/MoveStatistics";
import { setAllLog } from "../reducers/allLogReducer.ts";
import { nextBoard } from "../reducers/boardIndexReducer";
import { newChessBoard } from "../reducers/board/chessBoardReducer.ts";
import { updateState } from "../reducers/gameReducer.ts";
import { createMove } from "../reducers/moveReducer";
import store from "../store";
import { GameState } from "../types.ts";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { newConnectFourBoard } from "../reducers/board/connectFourBoardReducer.ts";
import { setToast } from "../reducers/toastReducer.ts";

const path = `${import.meta.env.BASE_URL}/socket.io`.replace("//", "/");

const boardActionCreators = new Map<
    string,
    ActionCreatorWithPayload<MoveStatistics>
>([
    ["chess", newChessBoard],
    ["connect_four", newConnectFourBoard],
]);

const startGame = (config: GameConfig) => {
    const newBoard = boardActionCreators.get(config.game)!;

    const socket = io("/gameconnection", { path });
    socket.connect();

    socket.on("newmove", (move: MoveStatistics) => {
        store.dispatch(createMove(move));
        store.dispatch(
            updateState(
                move.state !== undefined ? move.state : GameState.INVALID,
            ),
        );
        store.dispatch(nextBoard());
        store.dispatch(newBoard(move));
    });

    socket.on("final", (data: { state: string; allLogs: string }) => {
        console.log(data.allLogs);
        store.dispatch(setAllLog(data.allLogs));
    });
    socket.emit("startgame", config);

    socket.on("error", (data: string) => {
        console.log(data);
        store.dispatch(
            setToast({ title: "ERROR", text: data, color: "Danger" }),
        );
    });
};

export { startGame };
