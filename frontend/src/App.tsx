import CodeView from "./components/CodeView.tsx";
import NavigationBar from "./components/NavigationBar.tsx";
import DataReceiver from "./components/DataReceiver.tsx";

function App() {
    return (
        <div>
            <NavigationBar />
            <>
                <CodeView></CodeView>
            </>
            <DataReceiver />
        </div>
    );
}

export default App;
