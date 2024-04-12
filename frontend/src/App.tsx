import { Route, Routes } from "react-router-dom";
import GameView from "./components/GameView";
import NavigationBar from "./components/NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import CFourManual from "./components/CFourManual";
import ChessManual from "./components/ChessManual";
import GeneralManual from "./components/GeneralManual";
import Home from "./components/Home";

function App() {
    return (
        <div className="app">
            <header>
                <NavigationBar />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/generalmanual" element={<GeneralManual />} />
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
                    <Route path="/chessmanual" element={<ChessManual />} />
                    <Route path="/cfourmanual" element={<CFourManual />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
