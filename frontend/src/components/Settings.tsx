import { Chessboard } from "kokopu-react";
import { useState } from "react";
import store from "../store";
import { setTheme } from "../reducers/themeReducer";
import { useAppSelector } from "../hook";

const Settings = () => {
    const [selectedTheme, setSelectedTheme] = useState(
        useAppSelector((state) => state.theme),
    );

    const colorsets = Chessboard.colorsets();

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTheme(event.target.value);
        store.dispatch(setTheme(event.target.value));
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
