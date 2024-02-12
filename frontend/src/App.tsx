import Chessboard from "./components/Chessboard.tsx";
import GameView from "./components/GameView.tsx";
import NavigationBar from "./components/NavigationBar.tsx";

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
