import CodeView from "./components/CodeView.tsx";
import NavigationBar from "./components/NavigationBar.tsx";

function App() {
    return (
        <div>
            <NavigationBar />
            <>
                <CodeView></CodeView>
            </>
        </div>
    );
}

export default App;
