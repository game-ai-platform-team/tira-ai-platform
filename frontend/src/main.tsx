import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import { getCookie } from "./services/CookieService";
import { updateTheme } from "./services/ThemeService";

const root = ReactDOM.createRoot(document.getElementById("root")!);
/**
 * Renders the application
 * Provides store and BrowserRouter for the App
 *
 * @returns render of the application
 */
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);


const selectedTheme = getCookie("theme") || "original";
updateTheme(selectedTheme)

document.body.style.backgroundColor = "var(--secondary)";
