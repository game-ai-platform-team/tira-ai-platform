import React, { useState } from "react";
import "./NavigationBar.css";

const NavigationBar = () => {
    const [selectedGame, setSelectedGame] = useState("Chess");

    const handleGameChange = (game) => {
        setSelectedGame(game);
        // Placeholder - add what happens when the game is changed
    };

    return (
        <div id="navigation-bar">
            <div className="dropdown">
                <button className="nav-button">
                    <span role="img" aria-label="GameIcon">
                        {getGameIcon(selectedGame)}
                    </span>{" "}
                    {selectedGame}
                </button>
                <div className="dropdown-content">
                    <button onClick={() => handleGameChange("Chess")}>
                        <span role="img" aria-label="GameIcon">
                            ♟️
                        </span>{" "}
                        Chess
                    </button>
                    <button onClick={() => handleGameChange("Gomoku")}>
                        <span role="img" aria-label="GameIcon">
                            🌀
                        </span>{" "}
                        Gomoku
                    </button>
                    <button onClick={() => handleGameChange("Othello")}>
                        <span role="img" aria-label="GameIcon">
                            ⚪
                        </span>{" "}
                        Othello
                    </button>
                    <button onClick={() => handleGameChange("Connect4")}>
                        <span role="img" aria-label="GameIcon">
                            🔴
                        </span>{" "}
                        Connect4
                    </button>
                </div>
            </div>
            <button className="nav-button">
                <span role="img" aria-label="Feedback">
                    &#x1F4AC;
                </span>{" "}
                Feedback
            </button>
        </div>
    );
};

// Function to get the appropriate icon for each game
const getGameIcon = (game) => {
    switch (game) {
        case "Chess":
            return "♟️";
        case "Gomoku":
            return "🌀";
        case "Othello":
            return "⚪";
        case "Connect4":
            return "🔴";
        default:
            return "";
    }
};

export default NavigationBar;
