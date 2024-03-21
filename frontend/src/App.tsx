import { useState } from "react";
import Chessboard from "./components/Chessboard";
import CFourboard from "./components/CFourboard";
import Gomokuboard from "./components/Gomokuboard";
import Othelloboard from "./components/Othelloboard";
import GameView from "./components/GameView";
import NavigationBar from "./components/NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [selectedGame, setSelectedGame] = useState<string>("chess");

    const handleGameChange = (game: string) => () => {
        setSelectedGame(game);
    };

    return (
        <div className="app">
            <header>
                <NavigationBar
                    selectedGame={selectedGame}
                    handleGameChange={handleGameChange}
                />
            </header>
            <main>
                <GameView selectedGame={selectedGame}>
                    {selectedGame === "chess" && <Chessboard />}
                    {selectedGame === "connect_four" && <CFourboard />}
                    {selectedGame === "gomoku" && <Gomokuboard />}
                    {selectedGame === "othello" && <Othelloboard />}
                </GameView>
            </main>
        </div>
    );
}

export default App;
