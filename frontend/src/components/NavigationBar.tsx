import React, { MouseEventHandler } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import "../scss/NavigationBar.scss";

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
            <Dropdown>
                <Dropdown.Toggle
                    as={Button}
                    variant="flat"
                    size="lg"
                    className="nav-button"
                >
                    {getGameIcon(selectedGame)} {selectedGame}
                </Dropdown.Toggle>

                <DropdownMenu>
                    <Dropdown.Item onClick={handleGameChange("chess")}>
                        ♟️ Chess
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleGameChange("gomoku")}>
                        🌀 Gomoku
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleGameChange("othello")}>
                        ⚪ Othello
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleGameChange("connect_four")}>
                        🔴 Connect 4
                    </Dropdown.Item>
                </DropdownMenu>
            </Dropdown>

            <Button className="nav-button" variant="flat" size="lg">
                💬 Feedback
            </Button>
            <button onClick={() => (location.href = "/login")}> login</button>
        </div>
    );
};

// Function to get the appropriate icon for each game
const getGameIcon = (game: string): string => {
    switch (game) {
        case "chess":
            return "♟️";
        case "gomoku":
            return "🌀";
        case "othello":
            return "⚪";
        case "connect_four":
            return "🔴";
        default:
            return "";
    }
};

export default NavigationBar;
