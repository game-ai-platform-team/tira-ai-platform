import { useState } from "react";
import Chessboard from "./components/Chessboard";
import CFourboard from "./components/CFourboard";
import Gomokuboard from "./components/Gomokuboard";
import Othelloboard from "./components/Othelloboard";
import GameView from "./components/GameView";
import NavigationBar from "./components/NavigationBar";

function App() {
    const [selectedGame, setSelectedGame] = useState<string>("Chess");

    const handleGameChange = (game: string) => {
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
                    {selectedGame === "Chess" && <Chessboard />}
                    {selectedGame === "Connect4" && <CFourboard />}
                    {selectedGame === "Gomoku" && <Gomokuboard />}
                    {selectedGame === "Othello" && <Othelloboard />}
                </GameView>
            </main>
        </div>
    );
}

export default App;
