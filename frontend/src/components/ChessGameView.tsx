import SubmitForm from "./SubmitForm.tsx";
import { useState, useCallback, useEffect } from "react";
import { ChessGameResult } from "../types.ts";
import { BrowsableChessboard } from "./BrowsableChessboard.tsx";
import JustInTimeMoveList from "./JustInTimeMoveList.tsx";
import { GameConnection } from "../services/GameConnection.ts";
import "./ChessGameView.css";

interface CodeViewProps {
    testResult?: ChessGameResult;
}

const gameConnections: Map<number, GameConnection> = new Map<
    number,
    GameConnection
>();

function getNewGameConnection() {
    let max = 0;
    for (const key of gameConnections.keys()) {
        if (key > max) {
            max = key;
        }
    }
    const id = max + 1;
    gameConnections.set(id, new GameConnection());
    return id;
}

function ChessGameView(props: CodeViewProps) {
    const [moves, setMoves] = useState<string[]>(
        props.testResult?.moves ? props.testResult.moves : [],
    );

    const [hasGameStarted, setHasGameStarted] = useState(false);

    const handleNewMove = useCallback((newMove: string, state: string) => {
        if (
            state === "CONTINUE" ||
            state === "WIN" ||
            state === "LOSE" ||
            state === "DRAW"
        ) {
            setMoves((prevMoves) => [...prevMoves, newMove]);
        }
    }, []);

    const [gameConnectionId, setGameConnectionId] = useState<number>();

    useEffect(() => {
        const id = getNewGameConnection();
        gameConnections.get(id)?.connect();
        setGameConnectionId(id);
        return () => {
            gameConnections.get(id)?.disconnect();
            gameConnections.delete(id);
        };
    }, []);

    let gameConnection: GameConnection | undefined;
    if (gameConnectionId) {
        gameConnection = gameConnections.get(gameConnectionId);
    }

    useEffect(() => {
        if (gameConnection) gameConnection.setHandleNewMove(handleNewMove);
    }, [handleNewMove, gameConnection]);

    const winnerMessage = <p>winner: {"testwinner"}</p>;

    return (
        <div id="chess-game-view">
            <div id="move-list-container">
                <JustInTimeMoveList moves={moves} onNewMove={handleNewMove} />
            </div>
            <div id="submit-form-container">
                <SubmitForm
                    gameConnection={gameConnection}
                    hasGameStarted={hasGameStarted}
                    setHasGameStarted={setHasGameStarted}
                />
            </div>
            {winnerMessage}
            <div style={{ flexGrow: 1 }}>
                <BrowsableChessboard moves={moves} />
            </div>
        </div>
    );
}

export default ChessGameView;
