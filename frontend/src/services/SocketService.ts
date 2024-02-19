import { io } from "socket.io-client";
import store from "../store";
import { createMove } from "../reducers/moveReducer";
import { newBoard } from "../reducers/boardReducer";
import GameConfig from "../interfaces/GameConfig";
import MoveStatistics from "../interfaces/MoveStatistics";
import { nextBoard } from "../reducers/boardIndexReducer";
import { setAllLog } from "../reducers/allLogReducer.ts";

const path = `${import.meta.env.BASE_URL}/socket.io`.replace("//", "/");

export function startGame(config: GameConfig) {
    const socket = io("/gameconnection", { path });
    socket.connect();

    socket.on("newmove", (move: MoveStatistics) => {
        store.dispatch(createMove(move));
        store.dispatch(newBoard(move));
        store.dispatch(nextBoard());
    });

    socket.on("final", (data: { state: string; allLogs: string }) => {
        console.log(data.allLogs);
        store.dispatch(setAllLog(data.allLogs));
    });
    socket.emit("startgame", config);
}
