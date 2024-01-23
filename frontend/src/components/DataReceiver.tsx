import React, { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

class MoveReceiver {
    private socket: Socket;

    constructor(handleNewMove: (move: string) => void) {
        this.socket = io('http://localhost:5000/movereceiver');

        this.socket.on('connect', () => {
            console.log('Connected to the server!');
        });

        this.socket.on('newmove', (data: { move: string }) => {
            handleNewMove(data.move);
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from the server.');
        });
    }

    disconnect() {
        this.socket.disconnect();
    }
}

const DataReceiver: React.FC = () => {
    const [move, setMove] = useState<string>("e2e4");
    let moveReceiver: MoveReceiver | null = null;

    useEffect(() => {
        moveReceiver = new MoveReceiver(setMove);

        return () => {
            moveReceiver?.disconnect();
        };
    }, []);

    return (
        <div>
            <p>Received move: {move}</p>
        </div>
    );
}

export default DataReceiver;
