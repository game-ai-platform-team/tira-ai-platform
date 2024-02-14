import Chessboard from "./components/Chessboard";
import GameView from "./components/GameView";
import NavigationBar from "./components/NavigationBar";

function App() {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <header>
                <NavigationBar />
            </header>

            <main>
                <GameView>
                    <Chessboard />
                </GameView>
            </main>
        </div>
    );
}

export default App;
