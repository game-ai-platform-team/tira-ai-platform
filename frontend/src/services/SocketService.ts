import { io, Socket } from "socket.io-client";
import store from "../store";
import { createMove } from "../reducers/moveReducer";
import { MoveProps } from "../components/Move";
import { GameConfig } from "../types.ts";

console.log("socket")

export class GameConnection {
    private socket: Socket;

    constructor() {
        this.socket = io("/gameconnection");


    }

    isConnected(): boolean {
        return this.socket.connected;
    }

    postcode(file: string, elo: number) {
        this.socket.emit("postcode", { content: file, elo });
    }

    connect() {
        this.socket.connect();
    }

    disconnect() {
        console.log("disconnected");
        this.socket.disconnect();
    }
}


export function startGame(config: GameConfig) {
    const socket = io("/gameconnection");
    socket.connect();

    socket.on(
        "newmove",
        ({ move, time, advantage, logs }: MoveProps) => {
            console.log("Received 'newmove' event:", {
                move,
                time,
                advantage,
                logs
            });
            store.dispatch(createMove({ move, time, advantage, logs }));
        }
    );
    socket.emit("postcode", config);


}
