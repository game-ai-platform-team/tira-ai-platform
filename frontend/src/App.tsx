import GameView from "./components/GameView.tsx";
import NavigationBar from "./components/NavigationBar.tsx";

function App() {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <header>
                <NavigationBar />
            </header>

            <main>
                <GameView />
            </main>
        </div>
    );
}

export default App;
