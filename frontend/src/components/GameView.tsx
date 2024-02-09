import SubmitForm from "./SubmitForm.tsx";
import { useState, useEffect } from "react";
import Chessboard from "./Chessboard.tsx";
import MoveList from "./MoveList.tsx";
import { GameConnection } from "../services/SocketService.ts";
import "./GameView.css";
import AdvantageChart from "./AdvantageChart.tsx";
import {
    getEvaluations,
    getStatistics,
} from "../services/StatisticsService.tsx";
import TimeChart from "./TimeChart.tsx";
import AdvantageBar from "./AdvantageBar.tsx";
import MoveStatistics from "../interfaces/MoveStatistics.ts";
import { useSelector } from "react-redux";
import { RootState } from "../store.ts";

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

function GameView({ advantage }: { advantage: number }) {
    const moves = useSelector((state: RootState) => state.moves);

    const [moveStatisticsList, setMoveStatisticsList] = useState<
        MoveStatistics[]
    >([]);

    const addMoveStatistics = (newMoveStatistics: MoveStatistics) => {
        setMoveStatisticsList((prevList) => [...prevList, newMoveStatistics]);
    };

    const [hasGameStarted, setHasGameStarted] = useState(false);

    const [gameState, setGameState] = useState("CONTINUE");

    const [currentAdvantage, setCurrentAdvantage] = useState<number>(0);

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

    const winnerMessage = <p>winner: {"testwinner"}</p>;

    const stats = getStatistics(moveStatisticsList);
    const evals = getEvaluations(moveStatisticsList);

    return (
        <div id="game-view">
            <SubmitForm
                gameConnection={gameConnection}
                hasGameStarted={hasGameStarted}
                setHasGameStarted={setHasGameStarted}
            />

            <Chessboard
                moves={moves.map((move) => move.move)}
                advantage={currentAdvantage}
            />
            <div id="winner-message">{winnerMessage}</div>
            <AdvantageBar linePosition={advantage} />

            <MoveList moves={moveStatisticsList} state={gameState} />
            <div id="statistics">
                <AdvantageChart data={evals.advantages} />
                <TimeChart data={stats.times} />
            </div>
        </div>
    );
}

export default GameView;
