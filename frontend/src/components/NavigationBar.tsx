import React, { MouseEventHandler } from "react";
import "../scss/NavigationBar.scss";
import Button from "./Button";

interface NavigationBarProps {
    selectedGame: string;
    handleGameChange: (game: string) => MouseEventHandler<HTMLButtonElement>;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
    selectedGame,
    handleGameChange,
}) => {
    return (
        <div id="navigation-bar">
            <div id="game-selection-menu" className="dropdown">
                <Button
                    className="nav-button"
                    label={selectedGame}
                    icon={getGameIcon(selectedGame)}
                />
                <div className="dropdown-content">
                    <Button
                        label="Chess"
                        icon="♟️"
                        onClick={handleGameChange("chess")}
                    />
                    <Button
                        label="Gomoku"
                        icon="🌀"
                        onClick={handleGameChange("othello")}
                    />
                    <Button
                        label="Othello"
                        icon="⚪"
                        onClick={handleGameChange("gomoku")}
                    />
                    <Button
                        label="Connect 4"
                        icon="🔴"
                        onClick={handleGameChange("connect_four")}
                    />
                </div>
            </div>
            <Button className="nav-button" label="Feedback" icon="💬" />
            <button onClick={() => (location.href = "/login")}> login</button>
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
