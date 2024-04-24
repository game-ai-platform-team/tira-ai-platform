import { Chessboard } from "kokopu-react";
import { useState } from "react";
import store from "../store";
import { setTheme } from "../reducers/themeReducer";

const Settings = () => {
    const [selectedTheme, setSelectedTheme] = useState("original");

    const colorsets = Chessboard.colorsets();

    const root = document.documentElement;

    root.style.setProperty("--primary", colorsets[selectedTheme].b);
    root.style.setProperty("--secondary", colorsets[selectedTheme].w);
    root.style.setProperty("--blue-marker", colorsets[selectedTheme].cb);
    root.style.setProperty("--green-marker", colorsets[selectedTheme].cg);
    root.style.setProperty("--red-marker", colorsets[selectedTheme].cr);
    root.style.setProperty("--yellow-marker", colorsets[selectedTheme].cy);
    store.dispatch(setTheme(selectedTheme))

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTheme(event.target.value);
    };

    return (
        <div>
            <select value={selectedTheme} onChange={handleThemeChange}>
                {Object.keys(colorsets).map((theme) => (
                    <option key={theme} value={theme}>
                        {theme}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Settings;
