import { io, Socket } from "socket.io-client";

export class GameConnection {
    private socket: Socket;

    constructor() {
        this.socket = io("http://localhost:5000/gameconnection");

        this.socket.on("connect", () => {
            console.log("Connected to the server!");
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from the server.");
        });
    }

    isConnected(): boolean {
        return this.socket.connected;
    }

    setHandleNewMove(
        handleNewMove: (move: string, state: string, time: number, eval: number) => void,
    ) {
        this.socket.on(
            "newmove",
            (data: { move: string; state: string; time: number }) => {
                handleNewMove(data.move, data.state, data.time, data.eval);
            },
        );
    }

    postcode(file: string) {
        this.socket.emit("postcode", { content: file });
    }

    connect() {
        this.socket.connect();
    }

    disconnect() {
        console.log("disconnected");
        this.socket.disconnect();
    }
}
