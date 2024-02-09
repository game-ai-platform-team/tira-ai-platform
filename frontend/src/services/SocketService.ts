import { io } from "socket.io-client";
import store from "../store";
import { createMove } from "../reducers/moveReducer";
import { GameConfig } from "../types.ts";
import MoveStatistics from "../interfaces/MoveStatistics.ts";

export function startGame(config: GameConfig) {
    const socket = io("/gameconnection");
    socket.connect();

    socket.on("newmove", ({ move, time, advantage, logs }: MoveStatistics) => {
        console.log("Received 'newmove' event:", {
            move,
            time,
            advantage,
            logs,
        });
        store.dispatch(createMove({ move, time, advantage, logs }));
    });
    socket.emit("postcode", config);
}
