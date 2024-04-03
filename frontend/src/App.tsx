import Chessboard from "./components/Chessboard";
import CFourboard from "./components/CFourboard";
import Gomokuboard from "./components/Gomokuboard";
import Othelloboard from "./components/Othelloboard";
import GameView from "./components/GameView";
import NavigationBar from "./components/NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppSelector } from "./hook";


function App() {
    const game = useAppSelector((state) => state.game.config.game);

    return (
        <div className="app">
            <header>
                <NavigationBar />
                <Notification />
            </header>
            <main>
                <GameView>
                    {game === "chess" && <Chessboard />}
                    {game === "connect_four" && <CFourboard />}
                    {game === "gomoku" && <Gomokuboard />}
                    {game === "othello" && <Othelloboard />}
                </GameView>
            </main>
        </div>
    );
}

export default App;
