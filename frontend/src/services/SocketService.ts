import { io } from "socket.io-client";
import GameConfig from "../interfaces/GameConfig.ts";
import MoveStatistics from "../interfaces/MoveStatistics";
import { setAllLog } from "../reducers/allLogReducer.ts";
import { nextBoard } from "../reducers/boardIndexReducer";
import { newBoard } from "../reducers/boardReducer";
import { updateState } from "../reducers/gameReducer.ts";
import { createMove } from "../reducers/moveReducer";
import store from "../store";
import { GameState } from "../types.ts";

const path = `${import.meta.env.BASE_URL}/socket.io`.replace("//", "/");

const startGame = (config: GameConfig) => {
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
    });
};

export { startGame };
