import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import GameView from "./components/GameView";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Manual from "./components/Manual";

/**
 * Main component of the application, rendering different views based on the route.
 *
 * @returns {JSX.Element} The rendered application component.
 */

function App() {
    return (
        <div className="app">
            <header>
                <NavigationBar />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/generalmanual"
                        element={<Manual game="general" />}
                    />
                    <Route path="/chess" element={<GameView game="chess" />} />
                    <Route
                        path="/connect_four"
                        element={<GameView game="connectfour" />}
                    />
                    <Route
                        path="/chessmanual"
                        element={<Manual game="chess" />}
                    />
                    <Route
                        path="/cfourmanual"
                        element={<Manual game="connect_four" />}
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
