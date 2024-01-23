import React, { useEffect, useState } from "react";
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

const JustInTimeMoveList: React.FC = () => {
    const [moves, setMoves] = useState<string[]>([]); // Store moves in an array
    let moveReceiver: MoveReceiver | null = null;

    useEffect(() => {
        moveReceiver = new MoveReceiver((newMove) => {
            setMoves((prevMoves) => [...prevMoves, newMove]); // Append the new move to the list of moves
        });

        return () => {
            moveReceiver?.disconnect();
        };
    }, []);

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
