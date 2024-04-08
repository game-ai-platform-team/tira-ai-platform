import GameView from "./components/GameView";
import NavigationBar from "./components/NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div className="app">
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
