import React from "react";
import "../scss/NavigationBar.scss";
import loginService from "../services/LoginService";

interface NavigationBarProps {
    selectedGame: string;
    handleGameChange: (game: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
    selectedGame,
    handleGameChange,
}) => {
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
                    <button onClick={() => handleGameChange("connect_four")}>
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
            <button
                onClick={() => {
                    loginService.login();
                }}
            >
                login
            </button>
        </div>
    );
};

// Function to get the appropriate icon for each game
const getGameIcon = (game: string): string => {
    switch (game) {
        case "Chess":
            return "♟️";
        case "Gomoku":
            return "🌀";
        case "Othello":
            return "⚪";
        case "connect_four":
            return "🔴";
        default:
            return "";
    }
};

export default NavigationBar;
