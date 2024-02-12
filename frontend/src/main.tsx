import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";

const root = ReactDOM.createRoot(document.getElementById("root")!);
const renderApp = () => {
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>,
    );
};

renderApp();
store.subscribe(renderApp);
