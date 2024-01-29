import ChessGameView from "./components/ChessGameView.tsx";
import NavigationBar from "./components/NavigationBar.tsx";

function App() {
    return (
        <div>
            <NavigationBar />
            <>
                <ChessGameView></ChessGameView>
            </>
        </div>
    );
}

export default App;
