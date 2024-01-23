import CodeView from "./components/CodeView.tsx";
import NavigationBar from "./components/NavigationBar.tsx";
import JustInTimeMoveList from "./components/JustInTimeMoveList.tsx";

function App() {
    return (
        <div>
            <NavigationBar />
            <>
                <CodeView></CodeView>
            </>
            <JustInTimeMoveList/>
        </div>
    );
}

export default App;
