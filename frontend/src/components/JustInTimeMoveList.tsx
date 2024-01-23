import React, { useEffect } from "react";
import { io, Socket } from "socket.io-client";

class MoveReceiver {
    private socket: Socket;

    constructor(handleNewMove: (move: string) => void) {
        this.socket = io("http://localhost:5000/movereceiver");

        this.socket.on("connect", () => {
            console.log("Connected to the server!");
        });

        this.socket.on("newmove", (data: { move: string }) => {
            handleNewMove(data.move);
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from the server.");
        });
    }

    disconnect() {
        this.socket.disconnect();
    }
}

interface JustInTimeMoveListProps {
    moves: string[];
    onNewMove: (newMove: string) => void;
}

const JustInTimeMoveList: React.FC<JustInTimeMoveListProps> = ({
    moves,
    onNewMove,
}) => {
    let moveReceiver: MoveReceiver | null = null;

    useEffect(() => {
        moveReceiver = new MoveReceiver(onNewMove);

        return () => {
            moveReceiver?.disconnect();
        };
    }, [onNewMove]);

    return (
        <div>
            <p>Received moves:</p>
            <ul>
                {moves.map((move, index) => (
                    <li key={index}>{move}</li>
                ))}
            </ul>
        </div>
    );
};

export default JustInTimeMoveList;
