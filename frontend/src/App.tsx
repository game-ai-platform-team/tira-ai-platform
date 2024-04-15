import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import GameView from "./components/GameView";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Manual from "./components/Manual";

function App() {
    return (
        <div className="app">
            <header>
                <NavigationBar />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/generalmanual" element={<Manual game="general" />} />
                    <Route path="/chess" element={<GameView game="chess" />} />
                    <Route
                        path="/connect_four"
                        element={<GameView game="connectfour" />}
                    />
                    <Route
                        path="/gomoku"
                        element={<GameView game="gomoku" />}
                    />
                    <Route
                        path="/othello"
                        element={<GameView game="othello" />}
                    />
                    <Route path="/chessmanual" element={<Manual game="chess" />} />
                    <Route path="/cfourmanual" element={<Manual game="connect_four" />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
