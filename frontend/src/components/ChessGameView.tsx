import SubmitForm from "./SubmitForm.tsx";
import { useState, useCallback, useEffect } from "react";
import { ChessGameResult } from "../types.ts";
import { BrowsableChessboard } from "./BrowsableChessboard.tsx";
import MoveList from "./MoveList.tsx";
import { GameConnection } from "../services/GameConnection.ts";
import "./ChessGameView.css";

interface CodeViewProps {
    testResult?: ChessGameResult;
}

interface MoveStatistics {
    move: string;
    time: number;
    advantage: number;
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

    const [moveStatisticsList, setMoveStatisticsList] = useState<
        MoveStatistics[]
    >([]);

    const addMoveStatistics = (newMoveStatistics: MoveStatistics) => {
        setMoveStatisticsList((prevList) => [...prevList, newMoveStatistics]);
    };

    const [hasGameStarted, setHasGameStarted] = useState(false);

    const [gameState, setGameState] = useState("CONTINUE");

    const [currentAdvantage, setCurrentAdvantage] = useState<number>(0);

    const handleNewMove = useCallback(
        (
            newMove: string,
            state: string,
            newTime: number,
            newAdvantage: number,
        ) => {
            if (
                state === "CONTINUE" ||
                state === "WIN" ||
                state === "LOSE" ||
                state === "DRAW" ||
                state === "MAX_TURNS"
            ) {
                setMoves((prevMoves) => [...prevMoves, newMove]);

                const newMoveStatistics: MoveStatistics = {
                    move: newMove,
                    time: newTime,
                    advantage: newAdvantage,
                };

                addMoveStatistics(newMoveStatistics);
                setCurrentAdvantage(newAdvantage);
            }
            setGameState(state);
        },
        [],
    );

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
            <div id="first-row">
                <div id="submit-form-container">
                    <SubmitForm
                        gameConnection={gameConnection}
                        hasGameStarted={hasGameStarted}
                        setHasGameStarted={setHasGameStarted}
                    />
                </div>
                <div id="chessboard-container">
                    <BrowsableChessboard
                        moves={moves}
                        advantage={currentAdvantage}
                    />
                    <div id="winner-message">{winnerMessage}</div>
                </div>
                <div id="move-list-container">
                    <MoveList moves={moveStatisticsList} state={gameState} />
                </div>
            </div>
        </div>
    );
}

export default ChessGameView;
